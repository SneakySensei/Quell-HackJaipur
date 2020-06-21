// src/components/NavBar.js

import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Members = (props) => {
  console.log(props.authData);

  return (
    <div className="members-container">
      {props.authData.groupInfo.members.map((member, index) => {
        var active = member.name === props.authData.data.name ? " active" : "";
        return (
          <div key={index} className={`member${active}`}>
            <div className="member-name">{member.name}</div>
            {props.authData.data.type === "therapist" &&
              member.type === "user" && (
                <div className="member-condition">{member.condition}</div>
              )}
            {member.type === "therapist" && (
              <div className="member-condition">Therapist</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Members;
