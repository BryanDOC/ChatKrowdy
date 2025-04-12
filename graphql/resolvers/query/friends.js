const db = require("../../../db");

const friendsResolvers = {
    
  Query: {
    friends: (_, { userId }) => {
        return new Promise((resolve, reject) => {
         
          const sql = `
            SELECT u.id, u.username, u.email
            FROM users u 
            INNER JOIN friend_requests fr
              ON (u.id = fr.sender_id AND fr.receiver_id = ?)
              OR (u.id = fr.receiver_id AND fr.sender_id = ?)
            WHERE fr.status = 'accepted'
          `;
          db.query(sql, [userId, userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      },
},
};

module.exports = friendsResolvers;