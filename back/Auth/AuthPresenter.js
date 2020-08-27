import React from "react";
import styled from "styled-components";
import Input from "../../Components/input";
import Button from "../../Components/Button";
import { ReactComponent as Logo } from "../../Img/logo.svg";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;
const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const logoStyle = {
  width: "80%",
  marginLeft: "10%",
  marginBottom: "30px",
};

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  setAction,
  onLogin,
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "logIn" ? (
          <form onSubmit={onLogin}>
            <Logo style={logoStyle} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Log In"} />
          </form>
        ) : (
          <form onSubmit={onLogin}>
            <Logo style={logoStyle} />
            <Input placeholder={"First Name"} {...firstName} />
            <Input placeholder={"Last Name"} {...lastName} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Button text={"Sign Up"} />
          </form>
        )}
      </Form>

      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?
            <Link onClick={() => setAction("signUp")}> Sign up</Link>
          </>
        ) : (
          <>
            Have an account?
            <Link onClick={() => setAction("logIn")}> Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
