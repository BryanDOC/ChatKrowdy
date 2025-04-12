const db = require("../../../db");

const messagesResolvers = {
    
  Query: {
    messages: (_, { conversationId }) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at';
          db.query(sql, [conversationId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      },

},
};

module.exports = messagesResolvers;