const db = require("../../../db");

const searchUsersResolvers = {
    
  Query: {
    searchUsers: (_, { search }) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, username, email
        FROM users
        WHERE username LIKE ? OR email LIKE ?
      `;
      const searchTerm = `%${search}%`;
      db.query(sql, [searchTerm, searchTerm], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
},
};

module.exports = searchUsersResolvers;