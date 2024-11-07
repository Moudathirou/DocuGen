// config/database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données SQLite:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
  }
});

// Création des tables si elles n'existent pas
db.serialize(() => {
 
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    isAdmin INTEGER DEFAULT 0
  )`);
  

  db.run(`CREATE TABLE IF NOT EXISTS documentation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT,
    docs TEXT,
    user_id INTEGER,
    created_at TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});


  

module.exports = db;
