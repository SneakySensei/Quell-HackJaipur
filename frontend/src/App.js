import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";

import LandingPage from "./components/LandingPage";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [auth, setAuth] = useState(false);

  const { loading, user, isAuthenticated } = useAuth0();

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
