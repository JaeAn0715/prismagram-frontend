import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import AppRouter from "./Router";

import { useQuery, gql } from "@apollo/client";

import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import { HashRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <AppRouter isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    </ThemeProvider>
  );
};
