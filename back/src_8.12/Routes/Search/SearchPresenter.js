import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SearchPost from "../../Components/SearchPost";
import Helmet from "react-helmet";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Section = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
  margin-bottom: 50px;
`;

const PostSection = styled(Section)`
  grid-gap: 4px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SectionHeader = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const EFatText = styled(FatText)`
  color: ${(props) => props.theme.lightGreyColor};
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <Helmet>
          <title>Search | Prismagram</title>
        </Helmet>
        <EFatText text="Search for something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Helmet>
          <title>Search | Prismagram</title>
        </Helmet>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Helmet>
          <title>Search | Prismagram</title>
        </Helmet>
        <SectionHeader>Users</SectionHeader>
        <Section>
          {data.searchUser.length === 0 ? (
            <EFatText text="No Users Found" />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                username={user.name}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isMyself={user.isMyself}
                id={user.id}
              />
            ))
          )}
        </Section>
        <SectionHeader>Feeds</SectionHeader>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <EFatText text="No Posts Found" />
          ) : (
            data.searchPost.map((post) => (
              <SearchPost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;
