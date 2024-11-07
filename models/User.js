// models/User.js
const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async create(email, password, isAdmin = false) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
          db.run(
            'INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)',
            [email, hashedPassword, isAdmin],
            function (err) {
              if (err) reject(err);
              else resolve({ id: this.lastID });
            }
          );
        });
      }


      static count() {
        return new Promise((resolve, reject) => {
          db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
            if (err) reject(err);
            else resolve(row.count);
          });
        });
      }
    
      static getRecentUsers() {
        return new Promise((resolve, reject) => {
          db.all('SELECT email FROM users ORDER BY id DESC LIMIT 5', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });
      }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}




module.exports = User;
