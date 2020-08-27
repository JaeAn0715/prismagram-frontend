import React from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Logo } from "../Img/logo.svg";

const Animation = keyframes`
0% {
  opacity: 0
}
50%{
  opacity: 1
}
100%{
  opacity: 0;
}
`;

const Loader = styled.div`
  width: 150px;
  animation: ${Animation} 1.5s linear infinite;
`;

const LoaderContainer = styled.div`
  width: 100%;
`;

export default () => (
  <LoaderContainer>
    <Loader>
      <Logo />
    </Loader>
  </LoaderContainer>
);
