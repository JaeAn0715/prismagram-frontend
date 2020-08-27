import { gql } from "@apollo/client";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      likeCount
      commentCount
      files {
        url
      }
    }
    searchUser(term: $term) {
      id
      avatar
      name
      isFollowing
      isMyself
    }
  }
`;
