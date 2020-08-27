import React from "react";
import styled, { keyframes } from "styled-components";

const Animation = keyframes`
0% {
   transform: rotate(0deg); 
   border-top: 3px solid #e94e07;
  }
50% {
    transform: rotate(180deg);
    border-top: 10px solid #fdce00;
   }
100% {
   transform: rotate(360deg);
   border-top: 3px solid #e94e07;
  }
`;

const Loader = styled.div`
  margin: auto;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${Animation} 0.5s linear infinite;
`;

const LoaderContainer = styled.div`
  padding-top: 20vh;
  width: 100%;
`;

export default () => (
  <LoaderContainer>
    <Loader></Loader>
  </LoaderContainer>
);
