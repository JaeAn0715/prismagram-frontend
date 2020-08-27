import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { ME } from "../../SharedQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  location,
  caption,
  isLiked,
  postComments,
  createdAt,
  avatar,
}) => {
  const [isLikedState, setIsLiked] = useState(isLiked);
  const [likeCountState, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");

  const { data: meQuery } = useQuery(ME);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });

  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 2000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 2000);
    }
  };

  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = () => {
    toggleLikeMutation();

    if (isLikedState === true) {
      setIsLiked(false);
      setLikeCount(likeCountState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountState + 1);
    }
  };

  const onKeyPress = (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      comment.setValue("");
      addCommentMutation();

      setSelfComments([
        ...selfComments,
        {
          id: Math.floor(Math.random() * 10000),
          text: comment.value,
          user: { name: meQuery.me.user.name },
        },
      ]);
    }
  };

  return (
    <PostPresenter
      key={id}
      user={user}
      avatar={avatar}
      files={files}
      likeCount={likeCountState}
      isLiked={isLikedState}
      location={location}
      caption={caption}
      postComments={postComments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  postComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    })
  ),
  createdAt: PropTypes.string,
};

export default PostContainer;
