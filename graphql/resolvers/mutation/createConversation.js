const db = require("../../../db");


const createConversationResolvers = {
    
  Mutation: {
    createConversation: async (_, { senderId, receiverId }) => {
      
        return new Promise((resolve, reject) => {
        
          const checkSql = `
            SELECT * FROM conversations 
            WHERE (user1_id = ? AND user2_id = ?) 
               OR (user1_id = ? AND user2_id = ?)
            LIMIT 1
          `;
          db.query(checkSql, [senderId, receiverId, receiverId, senderId], (err, results) => {
            if (err) return reject(err);
      
            if (results.length > 0) {
             
              const convo = results[0];
              return resolve({
                id: convo.id,
                user1_id: convo.user1_id,
                user2_id: convo.user2_id,
              });
            } else {
           
              const insertSql = `
                INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)
              `;
              db.query(insertSql, [senderId, receiverId], (err, result) => {
                if (err) return reject(err);
                resolve({
                  id: result.insertId,
                  user1_id: senderId,
                  user2_id: receiverId,
                });
              });
            }
          });
        });
      },
},
};

module.exports = createConversationResolvers;