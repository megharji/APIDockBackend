const pool = require("../config/db");

const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const getUserByEmail = async (email) => {
  return await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
};

const createUser = async (name, email, passwordHash) => {
  return await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, passwordHash]
  );
};

const getUserById = async (id) => {
  return await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id]
  );
};


const updateUserName = async (id, name) => {
  return await pool.query(
    `UPDATE users 
     SET name = $1 
     WHERE id = $2 
     RETURNING id, name, email, created_at`,
    [name, id]
  );
};


module.exports = {
  createUserTable,
  getUserByEmail,
  createUser,
  getUserById,
  updateUserName
};