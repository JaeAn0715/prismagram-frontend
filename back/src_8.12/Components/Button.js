import React from "react";
import styled from "styled-components";
import PorpTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  margin-top: 15px;
  cursor: pointer;
`;

const Button = ({ text, className, onClick }) => (
  <Container className={className} onClick={onClick}>
    {text}
  </Container>
);

Button.prototype = {
  text: PorpTypes.string.isRequired,
};

export default Button;
