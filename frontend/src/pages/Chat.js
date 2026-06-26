import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function Chat() {
  const [searchParams] = useSearchParams();
  const receiver = searchParams.get("receiver");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id);

    loadMessages();

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const loadMessages = async () => {
    if (!receiver) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/${user._id}/${receiver}`
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !receiver) return;

    const data = {
      sender: user._id,
      receiver,
      message,
    };

    try {
      await axios.post("http://localhost:5000/api/chat/send", data);

      socket.emit("send-message", data);

      setMessages((prev) => [...prev, data]);

      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>💬 Travel Buddy Chat</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: "350px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "15px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>
              {msg.sender === user._id ? "You" : "Travel Buddy"}:
            </strong>{" "}
            {msg.message}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%", padding: "10px" }}
      />

      <button
        onClick={sendMessage}
        style={{ marginLeft: "10px", padding: "10px 20px" }}
      >
        Send
      </button>
    </div>
  );
}

export default Chat;