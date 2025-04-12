import { gql } from '@apollo/client';

export const FriendsWithLastMessage = gql`
  query FriendsWithLastMessage($userId: ID!) {
    friendsWithLastMessage(userId: $userId) {
    id
    username
    email
    conversationId
    lastMessage
    }
  }
`;
