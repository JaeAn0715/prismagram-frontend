import React from "react";
import Button from "../Button";

export default ({ isFollowing, onClick, className }) => (
  <Button
    text={isFollowing ? "Unfollow" : "Follow"}
    onClick={onClick}
    className={className}
  />
);
