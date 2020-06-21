// src/components/NavBar.js

import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

import { Container, Row, Col } from "react-bootstrap";

import TopBar from "./TopBar";
import Menu from "./Menu";
import SignUpForm from "./SignUpForm";
import Members from "./Members";
import Chat from "./Chat";

const ChatWindow = () => {
  const { getTokenSilently } = useAuth0();
  const [auth, setAuth] = useState({});

  const [authData, setAuthData] = useState({});

  const authenticate = (event) => {
    getTokenSilently().then((token) => {
      fetch("http://localhost:3001/users/authenticate", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          setAuth(res);
          return res.json();
        })
        .then((res) => setAuthData(res));
    });
  };

  useEffect(() => {
    authenticate();
  }, []);

  // if (auth === {}) {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <h1>Please wait...</h1>
  //       </header>
  //     </div>
  //   );
  // }
  console.log(authData);
  if (authData.type === "signup") {
    return <SignUpForm />;
  } else if (authData.type === "login") {
    return (
      <>
        <TopBar />
        <Container fluid className="chat-container">
          <Row>
            <Col>
              <Menu userName={authData.data.name} />
            </Col>
            <Col xs={6}>
              <div className="chat-container">
                <Chat authData={authData} />
              </div>
            </Col>
            <Col>
              {authData.type === "login" && <Members authData={authData} />}
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          {!auth && <h1>Please wait...</h1>}
          {authData && <h2>Logging In...</h2>}
        </header>
      </div>
    );
  }
};

export default ChatWindow;
