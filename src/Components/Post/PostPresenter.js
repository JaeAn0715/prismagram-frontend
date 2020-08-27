import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  user-select: none;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 400;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-top: 10px;
  span {
    margin-right: 10px;
    font-weight: 800;
  }
`;

const LinkText = styled.p`
  margin: 8px 0px;
  color: ${(props) => props.theme.darkerBlueColor};
  font-weight: 800;
`;

export default ({
  user: { name, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  caption,
  onKeyPress,
  postComments,
  selfComments,
}) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <Link to={`${name}`}>
          <FatText text={name} />
          <Location>{location}</Location>
        </Link>
      </UserColumn>
    </Header>
    <Files>
      {files &&
        files.map((file, index) => (
          <File
            key={file.id}
            id={file.id}
            src={file.url}
            showing={index === currentItem}
          />
        ))}
    </Files>
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        <Button>
          <CommentIcon />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Comments>
        <Comment>
          <Link to={`${name}`}>
            <FatText text={name} />
          </Link>
          {caption}
        </Comment>
      </Comments>

      {postComments.length > 0 && (
        <LinkText>{postComments.length} Comments on this post</LinkText>
      )}

      {postComments && (
        <Comments>
          {postComments.map((comment) => (
            <Comment key={comment.id}>
              <Link to={`${comment.user.name}`}>
                <FatText text={comment.user.name} />
              </Link>
              {comment.text}
            </Comment>
          ))}
          {selfComments.map((comment) => (
            <Comment key={comment.id}>
              <Link to={`${comment.user.name}`}>
                <FatText text={comment.user.name} />
              </Link>
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
      <Timestamp>{createdAt}</Timestamp>
      <Textarea
        placeholder={"Add a comment"}
        value={newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyPress}
      />
    </Meta>
  </Post>
);
