import React from "react";

import styled from "styled-components";
import Input from "../../Components/input";
import Button from "../../Components/Button";
import { ReactComponent as Logo } from "../../Img/logo.svg";
import Helmet from "react-helmet";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
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
  margin-top: 80px;
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

const AuthPresenter = ({
  username,
  firstName,
  lastName,
  email,
  secret,
  action,
  onSubmit,
  setAction,
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>Log In | J-Stargram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Logo style={logoStyle} />
              <Input placeholder={"Email"} {...email} type="email" />
              <Button text={"Log in"} />
            </form>
          </>
        )}
        {action === "signUp" && (
          <>
            <Helmet>
              <title>Sign Up | J-Stargram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Logo style={logoStyle} />
              <Input
                placeholder={"Email"}
                value={email.value}
                onChange={email.onChange}
                type="email"
              />
              <Input
                placeholder={"Username"}
                value={username.value}
                onChange={username.onChange}
              />
              <Input
                placeholder={"First Name"}
                value={firstName.value}
                onChange={firstName.onChange}
              />
              <Input
                placeholder={"Last Name"}
                value={lastName.value}
                onChange={lastName.onChange}
              />
              <Button text={"Sign Up"} />
            </form>
          </>
        )}
        {action === "confirm" && (
          <>
            <Helmet>
              <title>Confirm Secret | J-Stargram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder="Paste your secret" required {...secret} />
              <Button text={"Confirm"} />
            </form>
          </>
        )}
      </Form>

      <StateChanger>
        {action === "logIn" && (
          <>
            Don't have an account?
            <Link onClick={() => setAction("signUp")}> Sign up</Link>
          </>
        )}
        {action === "signUp" && (
          <>
            Have an account?
            <Link onClick={() => setAction("logIn")}> Log in</Link>
          </>
        )}
        {action === "confirm" && (
          <>
            Have another account?
            <Link onClick={() => setAction("logIn")}> Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};

export default AuthPresenter;
