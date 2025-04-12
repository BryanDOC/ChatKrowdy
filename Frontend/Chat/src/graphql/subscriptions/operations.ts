import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';


export const SEND_MESSAGE: DocumentNode = gql`
  mutation SendMessage($conversationId: ID!, $sender_id: ID!, $content: String!) {
    sendMessage(conversationId: $conversationId, sender_id: $sender_id, content: $content) {
      id
      conversation_id
      sender_id
      content
      created_at
    }
  }
`;


export const MESSAGE_SENT: DocumentNode = gql`
  subscription MessageSent($conversationId: ID!) {
    messageSent(conversationId: $conversationId) {
      id
      conversation_id
      sender_id
      content
      created_at
    }
  }
`;
