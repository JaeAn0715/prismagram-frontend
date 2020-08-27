import React from "react";
import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import styled from "styled-components";
import FatText from "../Components/FatText";

const SEARCH_POST = gql`
searchPost($term:String!){
    searchPost(term:$term)
}
`;

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

export default withRouter(({ location: { search } }) => {
  const searchTerm = search.split("=")[1];
  return (
    <Wrapper>
      {searchTerm === undefined && <FatText text={"search for something"} />}
    </Wrapper>
  );
});
