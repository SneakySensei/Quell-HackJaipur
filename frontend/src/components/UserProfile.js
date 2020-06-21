// src/components/NavBar.js

import React from "react";
import userImage from "../user.svg";
import { useAuth0 } from "../react-auth0-spa";
import { Button } from "react-bootstrap";

const UserProfile = (props) => {
  const { logout, user } = useAuth0();

  return (
    <div className="profile">
      <img src={userImage} className="profile-pic" alt="Profile" />
      <div className="profile-name">{props.userName}</div>
      <div className="profile-email">{user.name}</div>
      <Button onClick={logout}>Log Out</Button>
    </div>
  );
};

export default UserProfile;
