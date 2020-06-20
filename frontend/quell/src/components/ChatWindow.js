// src/components/NavBar.js

import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import TopBar from "./TopBar";
import Menu from "./Menu";

const ChatWindow = () => {
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
