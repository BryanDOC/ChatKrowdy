import { gql } from '@apollo/client';


export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($senderId: ID!, $receiverId: ID!) {
    createConversation(senderId: $senderId, receiverId: $receiverId) {
      id
      user1_id
      user2_id
    }
  }
`;
