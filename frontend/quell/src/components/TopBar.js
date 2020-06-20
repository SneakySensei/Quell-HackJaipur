// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

import { Container, Row, Col } from "react-bootstrap";

const TopBar = () => {
  const { logout } = useAuth0();

  return (
    <Container fluid className="topbar">
      <div>Quell</div>
    </Container>
  );
};

export default TopBar;
