const pool = require("../config/db");

const createRequestHistoryTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS request_history (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      request_id INTEGER,
      method TEXT NOT NULL,
      url TEXT NOT NULL,
      status_code INTEGER,
      response_body JSONB,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_history_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_history_request
        FOREIGN KEY(request_id)
        REFERENCES api_requests(id)
        ON DELETE SET NULL
    )
  `);
};

const createHistory = async (userId, requestId, method, url, statusCode, responseBody) => {
  return await pool.query(
    `INSERT INTO request_history (user_id, request_id, method, url, status_code, response_body)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      userId,
      requestId,
      method,
      url,
      statusCode,
      JSON.stringify(responseBody ?? {})
    ]
  );
};

const getHistoryByUserId = async (userId) => {
  return await pool.query(
    `SELECT * FROM request_history
     WHERE user_id = $1
     ORDER BY id DESC`,
    [userId]
  );
};

const filterHistory = async (userId, filters = {}) => {
  let query = `SELECT * FROM request_history WHERE user_id = $1`;
  const values = [userId];
  let index = 2;

  if (filters.id) {
    query += ` AND id = $${index}`;
    values.push(filters.id);
    index++;
  }

  if (filters.request_id) {
    query += ` AND request_id = $${index}`;
    values.push(filters.request_id);
    index++;
  }

  if (filters.method) {
    query += ` AND method = $${index}`;
    values.push(filters.method.toUpperCase());
    index++;
  }

  if (filters.url) {
    query += ` AND url ILIKE $${index}`;
    values.push(`%${filters.url}%`);
    index++;
  }

  if (filters.status_code) {
    query += ` AND status_code = $${index}`;
    values.push(filters.status_code);
    index++;
  }

  if (filters.executed_at) {
    query += ` AND DATE(executed_at) = $${index}`;
    values.push(filters.executed_at);
    index++;
  }

  query += ` ORDER BY id DESC`;

  return await pool.query(query, values);
};

const deleteHistoryById = async (id, userId) => {
  return await pool.query(
    `DELETE FROM request_history
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );
};



module.exports = {
  createRequestHistoryTable,
  createHistory,
  getHistoryByUserId,
  filterHistory,
  deleteHistoryById,
};