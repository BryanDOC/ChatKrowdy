const db = require("../../../db");


const respondToFriendRequestResolvers = {
    
  Mutation: {
    respondToFriendRequest: (_, { requestId, accept }) => {
        return new Promise((resolve, reject) => {
          const newStatus = accept ? "accepted" : "rejected";
      
          const sql = `
            UPDATE friend_requests
            SET status = ?
            WHERE id = ?
          `;
      
          db.query(sql, [newStatus, requestId], (err, result) => {
            if (err) return reject(err);
      
            if (result.affectedRows === 0) {
              return reject(new Error("Solicitud no encontrada."));
            }
      
            const msg = accept
              ? "Solicitud de amistad aceptada."
              : "Solicitud de amistad rechazada.";
            resolve(msg);
          });
        });
      },
},
};

module.exports = respondToFriendRequestResolvers;