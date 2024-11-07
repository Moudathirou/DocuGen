// models/Documentation.js
const db = require('../config/database');


class Documentation {
    static create(code, docs, user_id) {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO documentation (code, docs, user_id, created_at) VALUES (?, ?, ?, datetime("now"))',
          [code, docs, user_id],
          function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID });
          }
        );
      });
    }


    static count() {
        return new Promise((resolve, reject) => {
          db.get('SELECT COUNT(*) as count FROM documentation', (err, row) => {
            if (err) reject(err);
            else resolve(row.count);
          });
        });
      }
    
      static countActiveToday() {
        return new Promise((resolve, reject) => {
          db.get(
            `SELECT COUNT(DISTINCT user_id) as count FROM documentation WHERE date(created_at) = date('now')`,
            (err, row) => {
              if (err) reject(err);
              else resolve(row.count);
            }
          );
        });
      }



  static findByUserId(user_id) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM documentation WHERE user_id = ?', [user_id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = Documentation;
