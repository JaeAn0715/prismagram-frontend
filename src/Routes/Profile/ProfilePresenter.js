import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Helmet from "react-helmet";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SearchPost from "../../Components/SearchPost";
import Button from "../../Components/Button";

const Header = styled.header`
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const HeaderColumn = styled.div`
  &:first-child {
    width: 30%;
  }
  width: 70%;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Username = styled.span`
  font-size: 26px;
  margin-bottom: 10px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Buttons = styled.div`
  margin-left: 30px;
  margin-top: -15px;
  width: 30%;
`;

const UsernameRow = styled.div`
  display: flex;
  algin-items: center;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Post = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

const EFatText = styled(FatText)`
  font-weight: 600;
`;

export default ({ loading, data, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        name,
        fullName,
        isFollowing,
        isMyself,
        bio,
        followingCount,
        followersCount,
        postsCount,
        postings,
      },
    } = data;

    return (
      <Wrapper>
        <Helmet>
          <title>{name} | J-Stargram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{name}</Username>
              <Buttons>
                {!isMyself && (
                  <FollowButton id={id} isFollowing={isFollowing} />
                )}
                {isMyself && <Button text={"Log Out"} onClick={logOut} />}
              </Buttons>
            </UsernameRow>

            <Counts>
              <Count>
                <EFatText text={String(postsCount)} /> Posts
              </Count>
              <Count>
                <EFatText text={String(followersCount)} /> Followers
              </Count>
              <Count>
                <EFatText text={String(followingCount)} /> Following
              </Count>
            </Counts>
            {!fullName === null && <FullName text={fullName} />}
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Post>
          {postings &&
            postings.map((post) => (
              <SearchPost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0].url}
              />
            ))}
        </Post>
      </Wrapper>
    );
  }
  return null;
};
