// src/components/NavBar.js

import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import UserProfile from "./UserProfile";

const Menu = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="menu-container">
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
        <div
          className={`button`}
          onClick={() =>
            window.open(
              "https://github.com/sneakysensei/Quell-HackJaipur",
              "_blank"
            )
          }
        >
          Github Repo
        </div>
        <div className={`button`} onClick={handleShow}>
          Get Help
        </div>
        <UserProfile />
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

export default Menu;
