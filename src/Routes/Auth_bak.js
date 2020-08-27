import React, { useState } from "react";
import useInput from "../Hooks/useInput";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import styled from "styled-components";
import Input from "../Components/input";
import Button from "../Components/Button";
import { ReactComponent as Logo } from "../Img/logo.svg";

import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
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

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("non1345@naver.com");
  const secret = useInput("");

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You don't have account yet. Create one");
        setTimeout(() => setAction("signUp"), 2000);
      } else {
        toast.success("Check your email to log in");
        setAction("confirm");
      }
    },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      name: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
    update: (_, { data }) => {
      const { createAccount } = data;
      if (!createAccount) {
        toast.error("Can't create account. Try again.");
      } else {
        toast.success("Your account has been created. Please login");
        setTimeout(() => {
          setAction("logIn");
        }, 3000);
      }
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          await requestSecretMutation();
        } catch {
          toast.error("Can't request secret. Try again.");
        }
      } else {
        toast.error("Email is required to login");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          await createAccountMutation();
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All fields are required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const { data } = await confirmSecretMutation();
          const token = data.confirmSecret;

          if (token !== "" || token !== undefined) {
            console.log(token);
            await localLoginMutation({ variables: { token: token } });
          }
        } catch (e) {
          toast.error(e.message);
        }
      }
    }
  };

  return (
    <Wrapper>
      <Form>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>Log In | Prismagram</title>
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
              <title>Sign Up | Prismagram</title>
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
              <title>Confirm Secret | Prismagram</title>
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
