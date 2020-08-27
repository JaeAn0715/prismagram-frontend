import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";

import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import AuthContainer from "./AuthPresenter";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
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
    <AuthContainer
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      action={action}
      setAction={setAction}
      onSubmit={onSubmit}
    />
  );
};
