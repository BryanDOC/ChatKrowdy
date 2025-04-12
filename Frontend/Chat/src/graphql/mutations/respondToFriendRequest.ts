import { gql } from '@apollo/client';

export const RESPOND_TO_FRIEND_REQUEST_MUTATION = gql`
  mutation RespondToFriendRequest($requestId: ID!, $accept: Boolean!) {
    respondToFriendRequest(requestId: $requestId, accept: $accept)
  }
`;
