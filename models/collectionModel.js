const pool = require("../config/db");

const createCollectionsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS collections (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_collection_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    )
  `);
};


const createCollection = async (userId, name) => {
  return await pool.query(
    `INSERT INTO collections (user_id, name)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, name]
  );
};

const createRequest = async (userId, collectionId, title, method, url, headers, body) => {
  return await pool.query(
    `INSERT INTO api_requests (user_id, title, method, url, headers, body, collection_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, title, method, url, headers, body, collectionId]
  );
};

const filterCollections = async (userId, filters = {}) => {
  let query = `SELECT * FROM collections WHERE user_id = $1`;
  const values = [userId];
  let index = 2;

  if (filters.id) {
    query += ` AND id = $${index}`;
    values.push(filters.id);
    index++;
  }

  if (filters.name) {
    query += ` AND name ILIKE $${index}`;
    values.push(`%${filters.name}%`);
    index++;
  }

  if (filters.created_at) {
    query += ` AND DATE(created_at) = $${index}`;
    values.push(filters.created_at);
    index++;
  }

  query += ` ORDER BY id DESC`;

  return await pool.query(query, values);
};

const updateCollectionById = async (id, userId, name) => {
  return await pool.query(
    `UPDATE collections
     SET name = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [name, id, userId]
  );
};

const deleteCollectionById = async (id, userId) => {
  return await pool.query(
    `DELETE FROM collections
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );
};

module.exports = {
  createCollectionsTable,
  createCollection,
  filterCollections,
  updateCollectionById,
  deleteCollectionById,
};