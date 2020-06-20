// src/components/NavBar.js

import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

import { Container, Row, Col } from "react-bootstrap";

import TopBar from "./TopBar";
import Menu from "./Menu";

const ChatWindow = () => {
  const { getTokenSilently } = useAuth0();
  const [response, setResponse] = useState("");

  const authenticate = (event) => {
    getTokenSilently()
      .then((token) => {
        fetch("http://localhost:3001/users/authenticate", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.text())
          .then((text) => setResponse(text))
          .catch((e) => setResponse("API Failure"));
      })
      .catch((e) => setResponse("Token failure"));
  };

  useEffect(() => {
    authenticate();
  }, []);

  if (response === "") {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Please wait...</h1>
        </header>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Container fluid className="chat-container">
        {/* <header className="App-header">
        {!loading && user && (
          <>
            <h1>{user.given_name}</h1>
            <h1>{user.nickname}</h1>
            <h1>{user.name}</h1>
          </>
        )}

        <button onClick={callApi}>Call API</button>
        <button onClick={loginWithRedirect}>Login with redirect</button>
        <p>API response: {response}</p>
        <NavBar />
      </header> */}
        <Row>
          <Col>
            <Menu />
          </Col>
          <Col xs={6}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatWindow;
