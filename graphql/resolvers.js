const db = require("../db");
const pubsub = require("../pubsub");
const { withFilter } = require("graphql-subscriptions");
const friendsResolvers = require("./resolvers/query/friends"); 
const messagesResolvers = require("./resolvers/query/messages");
const friendsWithLastMessageResolvers = require("./resolvers/query/friendsWithLastMessage");
const searchUsersResolvers = require("./resolvers/query/searchUsers");
const pendingRequestResolvers = require("./resolvers/query/pendingRequests");
const sendFriendRequestResolvers = require("./resolvers/mutation/sendFriendRequest");
const respondToFriendRequestResolvers = require("./resolvers/mutation/respondToFriendRequest");
const login = require("./resolvers/mutation/login");
const registerUser = require("./resolvers/mutation/registerUser");
const createConversation = require("./resolvers/mutation/createConversation");
const NEW_MESSAGE = "NEW_MESSAGE";


const resolvers = {

  Query: {

    ...friendsResolvers.Query,
    ...messagesResolvers.Query,
    ...friendsWithLastMessageResolvers.Query,
    ...searchUsersResolvers.Query,
    ...pendingRequestResolvers.Query

    
    },

  Mutation: {

    ...sendFriendRequestResolvers.Mutation,
    ...respondToFriendRequestResolvers.Mutation,
    ...createConversation.Mutation,
    ...login.Mutation,
    ...registerUser.Mutation,
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

  Subscription: {
    messageSent: {
     
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        (payload, variables) => {
          return payload.messageSent.conversation_id === variables.conversationId;
        }
      )
    }
  }
};


module.exports = resolvers;
