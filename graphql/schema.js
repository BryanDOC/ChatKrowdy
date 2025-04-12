const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    
  }

  type FriendRequest {
    id: ID!
    sender_id: ID!
    receiver_id: ID!
    status: String!
    sender_username: String!
    
  }

  type FriendWithLastMessage {
  id: ID!
  username: String!
  email: String!
  lastMessage: String!
  conversationId: ID!
}

  type Message {
    id: ID!
    conversation_id: ID!
    sender_id: ID!
    content: String!
    created_at: String!
  }

  type Query {
  users: [User]
  searchUsers(search: String!): [User]
  pendingRequests(userId: ID!): [FriendRequest]
  friends(userId: ID!): [User]
  messages(conversationId: ID!): [Message]
  friendsWithLastMessage(userId: ID!): [FriendWithLastMessage]
}

type Conversation {
  id: ID!
  user1_id: ID!
  user2_id: ID!
  }

type Mutation {
    registerUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    sendFriendRequest(senderId: ID!, receiverId: ID!): String
    respondToFriendRequest(requestId: ID!, accept: Boolean!): String
    sendMessage(conversationId: ID!, sender_id: ID!, content: String!): Message
    createConversation(senderId: ID!, receiverId: ID!): Conversation
  }

  type Subscription {
    messageSent(conversationId: ID!): Message
  }
`;

module.exports = typeDefs;
