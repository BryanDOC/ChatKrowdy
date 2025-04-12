const db = require("../../../db");

const friendsWithLastMessageResolvers = {
    
  Query: {
    friendsWithLastMessage: (_, { userId }) => {
        return new Promise((resolve, reject) => {
          const sql = `
            SELECT 
              u.id,
              u.username,
              u.email,
              c.id AS conversationId,
              COALESCE(
                (
                  SELECT m.content
                  FROM messages m
                  WHERE m.conversation_id = c.id
                  ORDER BY m.created_at DESC
                  LIMIT 1
                ),
                'Inicia una conversación'
              ) AS lastMessage
            FROM conversations c
            -- Determinar el otro usuario en la conversación
            JOIN users u
              ON (c.user1_id = ? AND u.id = c.user2_id)
              OR (c.user2_id = ? AND u.id = c.user1_id)
            -- Verificar que haya una amistad aceptada entre userId y u.id
            JOIN friend_requests fr
              ON fr.status = 'accepted'
             AND (
               (fr.sender_id = ? AND fr.receiver_id = u.id)
               OR
               (fr.sender_id = u.id AND fr.receiver_id = ?)
             )
            WHERE ? IN (c.user1_id, c.user2_id)
          `;
        
          const params = [userId, userId, userId, userId, userId];
          db.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      },
},
};

module.exports = friendsWithLastMessageResolvers;