import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";

import LandingPage from "./components/LandingPage";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [response, setResponse] = useState("");
  const [auth, setAuth] = useState(false);

  const { loading, user, getTokenSilently, isAuthenticated } = useAuth0();
  const callApi = (event) => {
    getTokenSilently()
      .then((token) => {
        fetch("http://localhost:3001/users", {
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
  if (user && !auth) {
    setAuth(true);
  }

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Please wait...</h1>
        </header>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="App">
      <ChatWindow />
    </div>
  );
}

export default App;
