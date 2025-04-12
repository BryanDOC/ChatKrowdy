const db = require("../../../db");


const sendFriendRequestResolvers = {
    
  Mutation: {
    sendFriendRequest: (_, { senderId, receiverId }) => {
        return new Promise((resolve, reject) => {
          
          const checkSql = `
            SELECT * FROM friend_requests 
            WHERE sender_id = ? AND receiver_id = ? AND status = 'pending'
          `;
          db.query(checkSql, [senderId, receiverId], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
              return reject(new Error("Ya has enviado una solicitud pendiente a este usuario."));
            }
      
            const insertSql = `
              INSERT INTO friend_requests (sender_id, receiver_id, status)
              VALUES (?, ?, 'pending')
            `;
            db.query(insertSql, [senderId, receiverId], (err) => {
              if (err) return reject(err);
              resolve("Solicitud de amistad enviada correctamente.");
            });
          });
        });
      },
},
};

module.exports = sendFriendRequestResolvers;