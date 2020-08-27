import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;

const Container = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: felx;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;
const NumberText = styled.span`
  font-size: 26px;
  margin-left: 10px;
`;

const SearchPost = ({ likeCount, commentCount, file }) => (
  <Container bg={file}>
    <Overlay>
      <Number>
        <HeartFull />
        <NumberText>{likeCount}</NumberText>
      </Number>
      <Number>
        <CommentFull />
        <NumberText>{commentCount}</NumberText>
      </Number>
    </Overlay>
  </Container>
);

SearchPost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,
};

export default SearchPost;
