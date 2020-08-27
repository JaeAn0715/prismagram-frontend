import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import Helmet from "react-helmet";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      author {
        id
        avatar
        name
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      createdAt
      postComments {
        id
        text
        user {
          id
          name
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  console.log(data, loading);

  return (
    <Wrapper>
      <Helmet>
        <title>Feed | J-Stargram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            user={post.author}
            avatar={post.avatar}
            files={post.files}
            location={post.location}
            caption={post.caption}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            postComments={post.postComments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
