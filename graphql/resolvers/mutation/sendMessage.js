const db = require("../../../db");
const pubsub = require("../../../pubsub");

const sendMessageResolvers = {
    
  Mutation: {
    sendMessage: (_, { conversationId, sender_id, content }) => {
        return new Promise((resolve, reject) => {
         
          const createdAtPeru = new Date().toLocaleString("sv-SE", {
            timeZone: "America/Lima",
            hour12: false
          });
         
          const sql = `
            INSERT INTO messages (conversation_id, sender_id, content, created_at)
            VALUES (?, ?, ?, ?)
          `;
          db.query(
            sql,
            [conversationId, sender_id, content, createdAtPeru],
            (err, result) => {
              if (err) return reject(err);
              const newMessage = {
                id: result.insertId,
                conversation_id: conversationId,
                sender_id,
                content,
                created_at: createdAtPeru
              };
              pubsub.publish(NEW_MESSAGE, { messageSent: newMessage });
              resolve(newMessage);
            }
          );
        });
      },
},
};

module.exports = sendMessageResolvers;