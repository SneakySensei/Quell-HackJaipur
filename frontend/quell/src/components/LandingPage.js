// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const LandingPage = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <Container fluid="md" className="p-3">
      <Jumbotron>
        <h1 className="header">Quell</h1>
        <Button onClick={() => loginWithRedirect({})}>Login/Signup</Button>
      </Jumbotron>
    </Container>
  );
};

export default LandingPage;
