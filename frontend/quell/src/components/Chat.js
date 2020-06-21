import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "../react-auth0-spa";

import FreeScrollBar from "react-free-scrollbar";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";

const io = require("socket.io-client");
const socket = io("http://localhost:3001");

const Chat = (props) => {
  const ref = useRef();
  const { getTokenSilently } = useAuth0();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getTokenSilently().then((token) => {
      fetch(
        `http://localhost:3001/messages/?id=${props.authData.groupInfo._id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setMessages(res.messages);
        });
    });
  }, []);

  useEffect(() => {
    socket.on("message", (payload) => {
      setMessages((messages) => [...messages, payload]);
    });
  }, []);

  return (
    <>
      <div className="chat">
        <FreeScrollBar ref={ref}>
          {messages.map((message) => {
            return (
              <div className="message">
                <div>{message.name}</div>
                <div>{message.text}</div>
              </div>
            );
          })}
        </FreeScrollBar>
      </div>
      <div className="chat-inbox">
        <TextField
          className="input"
          label="Start typing..."
          variant="filled"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (text !== "") {
              getTokenSilently().then((token) => {
                const requestOptions = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  body: JSON.stringify({
                    groupid: props.authData.groupInfo._id,
                    name: props.authData.data.name,
                    text: text,
                  }),
                };
                fetch("http://localhost:3001/messages", requestOptions).then();
              });
            }
          }}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chat;
