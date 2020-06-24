import socketIOClient from "socket.io-client";

var socket = socketIOClient("/users");

export { socket };
