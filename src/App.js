import React from "react";
import styled from "styled-components";
import Router from "./shared/Router";

function App() {
  return (
    <GlobalStyle>
      <Router />
    </GlobalStyle>
  );
}

export default App;

const GlobalStyle = styled.div`
  width: 100vw;
  min-height: 1000px;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    url("/image/bg2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
`;
