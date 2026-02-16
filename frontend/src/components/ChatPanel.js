import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./chatpanel.css";

function ChatPanel() {
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const dispatch = useDispatch();

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        { text: message }
      );

      console.log("Backend response:", response.data);

      if (response.data?.data) {
        dispatch({
          type: "UPDATE_FORM",
          payload: response.data.data
        });
      }

      if (response.data?.response?.message) {
        setStatusMsg(response.data.response.message);
      }

      if (response.data?.error) {
        setStatusMsg(response.data.error);
      }

      setMessage("");

    } catch (error) {
      console.error("Backend error:", error);
      setStatusMsg("Backend connection failed.");
    }
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h3>🤖 AI Assistant</h3>
        <div className="chat-subtitle">
          Log interaction via chat
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-example">
          Log interaction details here (e.g.
          <br />
          <i>
            "Met Dr. Smith, discussed Product X efficacy,
            positive sentiment, shared brochure"
          </i>
          ) or ask for help.
        </div>

        {statusMsg && (
          <div className="chat-success">
            {statusMsg}
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Describe interaction..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
        />

        <button
          onClick={sendMessage}
          className="chat-button"
        >
          Log
        </button>
      </div>

    </div>
  );
}

export default ChatPanel;
