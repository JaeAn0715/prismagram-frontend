import React from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import AppRouter from "./Router";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <AppRouter isLoggedIn={isLoggedIn} />
        <Footer />
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
      </Wrapper>
    </ThemeProvider>
  );
};
