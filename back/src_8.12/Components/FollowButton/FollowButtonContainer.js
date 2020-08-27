import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingState, setisFollowingState] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingState === true) {
      unfollowMutation();
      setisFollowingState(false);
    } else {
      followMutation();
      setisFollowingState(true);
    }
  };
  return (
    <FollowButtonPresenter isFollowing={isFollowingState} onClick={onClick} />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;
