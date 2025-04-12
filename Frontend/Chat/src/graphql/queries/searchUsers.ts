import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers($search: String!) {
    searchUsers(search: $search) {
      id
      username
      email
    }
  }
`;
