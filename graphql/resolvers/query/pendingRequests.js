const db = require("../../../db");

const pendingRequestResolvers = {
    
  Query: {
    pendingRequests: (_, { userId }) => {
        return new Promise((resolve, reject) => {
          const sql = `
            SELECT 
              fr.id,
              fr.sender_id,
              u.username AS sender_username,
              fr.receiver_id,
              fr.status
            FROM friend_requests fr
            JOIN users u ON u.id = fr.sender_id
            WHERE fr.receiver_id = ? 
              AND fr.status = 'pending'
          `;
          db.query(sql, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      },
},
};

module.exports = pendingRequestResolvers;