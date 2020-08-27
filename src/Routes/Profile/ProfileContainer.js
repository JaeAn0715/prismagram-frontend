import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, LOG_OUT } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [logOut] = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
  }
);
