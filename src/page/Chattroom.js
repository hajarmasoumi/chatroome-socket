import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import DeleteIcon from "@mui/icons-material/Delete";
const Chatroom = () => {
  // Initialize socket only once using useRef
  const socketRef = useRef();
  const location = useLocation();
  const userData = location.state;
  console.log("userData", userData);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Connect to the Socket.IO server
    socketRef.current = io("http://localhost:3000");

    // Listen for incoming messages
    socketRef.current.on("message-received", (msg) => {
      console.log("msg", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    //delete message
    socketRef.current.on("delete-message", (id) => {
      setMessages((messages) => {
        let findIndex = -1;
        messages.forEach((message, index) => {
          if (message.id === id) {
            findIndex = index;
          }
        });
        return removeItemWithSlice(messages, findIndex);
      });
    });
    // Clean up the effect when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  const removeItemWithSlice = (items, index) => {
    if (index === -1) return items;
    return [...items.slice(0, index), ...items.slice(index + 1)];
  };
  const sendMessage = () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    // Emit a message to the server
    socketRef.current.emit("message", input, { sender: userData.name });
    setInput(""); // Clear the input field
  };
  const onDeleteClick = (id) => {
    socketRef.current.emit("delete-message", id);
  };
  return (
    <div>
      <h1>Chatroom</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {messages?.map((item, index) => (
          <div
            style={{
              border: "1px solid #c7bfbf",
              borderRadius: "30px",
              width: "100px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#c1c1b6" }}>
              {item?.sender?.sender}
            </span>
            <p key={index}>{item.msg}</p>
            {userData.name === item?.sender?.sender && (
              <IconButton>
                <DeleteIcon onClick={() => onDeleteClick(item.id)} />
              </IconButton>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") sendMessage(); // Send message on Enter key press
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatroom;
