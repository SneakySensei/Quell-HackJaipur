// src/components/NavBar.js

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import UserProfile from "./UserProfile";

const Menu = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="menu-container">
        <div className="button-group">
          <Button
            onClick={() =>
              window.open(
                "https://github.com/sneakysensei/Quell-HackJaipur",
                "_blank"
              )
            }
          >
            Github Repo
          </Button>
          <Button onClick={handleShow}>Get Help</Button>
        </div>
        <UserProfile userName={props.userName} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Get Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>Important contacts can be shown here.</Modal.Body>
        <Modal.Body>Contacts related to mental illness helplines</Modal.Body>
      </Modal>
    </>
  );
};

export default Menu;
