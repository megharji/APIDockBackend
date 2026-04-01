const pool = require("../config/db");

const createApiRequestsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS api_requests (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      method TEXT NOT NULL,
      url TEXT NOT NULL,
      headers JSONB DEFAULT '{}',
      body JSONB DEFAULT '{}',
      collection_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_collection
        FOREIGN KEY(collection_id)
        REFERENCES collections(id)
        ON DELETE SET NULL
    )
  `);
};

const createRequest = async (userId, collectionId, title, method, url, headers, body) => {
  return await pool.query(
    `INSERT INTO api_requests (user_id, collection_id, title, method, url, headers, body)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, collectionId, title, method, url, headers, body]
  );
};


const filterRequests = async (userId, filters) => {
  let query = `SELECT * FROM api_requests WHERE user_id = $1`;
  const values = [userId];
  let index = 2;

  if (filters.id) {
    query += ` AND id = $${index}`;
    values.push(filters.id);
    index++;
  }

  if (filters.method) {
    query += ` AND method = $${index}`;
    values.push(filters.method.toUpperCase());
    index++;
  }

  if (filters.title) {
    query += ` AND title ILIKE $${index}`;
    values.push(`%${filters.title}%`);
    index++;
  }

  query += ` ORDER BY id DESC`;

  return await pool.query(query, values);
};

const getRequestById = async (id, userId) => {
  return await pool.query(
    `SELECT * FROM api_requests
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
};

const updateRequestById = async (id, userId, title, method, url, headers, body, collection_id) => {
  return await pool.query(
    `UPDATE api_requests
     SET title = $1,
         method = $2,
         url = $3,
         headers = $4,
         body = $5,
         collection_id = $6
     WHERE id = $7 AND user_id = $8
     RETURNING *`,
    [title, method, url, headers, body, collection_id, id, userId]
  );
};

const deleteRequestById = async (id, userId) => {
  return await pool.query(
    `DELETE FROM api_requests
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );
};


module.exports = {
  createApiRequestsTable,
  createRequest,
  filterRequests ,
  getRequestById,
  updateRequestById,
  deleteRequestById,
};