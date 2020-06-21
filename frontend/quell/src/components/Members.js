// src/components/NavBar.js

import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Members = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(props.authData);

  return (
    <>
      <div className="members-container">
        {/* {props.authData.group.members.map((member, index) => (
          <div className="member">{member}</div>
        ))} */}

        <div className={`button`} onClick={handleShow}>
          Get Help
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal! Woohoo, you're reading
          this text in a modal! Woohoo, you're reading this text in a modal!
          Woohoo, you're reading this text in a modal! Woohoo, you're reading
          this text in a modal! Woohoo, you're reading this text in a modal!{" "}
        </Modal.Body>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
    </>
  );
};

export default Members;
