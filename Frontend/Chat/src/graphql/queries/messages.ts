import { gql } from '@apollo/client';

export const Messages = gql`
  query Messages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      id
      conversation_id
      sender_id
      content
      created_at
    }
  }
`;
