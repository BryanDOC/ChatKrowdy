import { gql } from '@apollo/client';

export const PENDING_REQUESTS_QUERY = gql`
  query PendingRequests($userId: ID!) {
    pendingRequests(userId: $userId) {
      id
      sender_id
      receiver_id
      status
      sender_username
    }
  }
`;
