import { gql } from "@apollo/client";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(name: $username) {
      id
      avatar
      name
      fullName
      isFollowing
      isMyself
      bio
      followingCount
      followersCount
      postsCount
      postings {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
