import React from "react";
import LeftForm from "./components/LeftForm";
import ChatPanel from "./components/ChatPanel";
import "./index.css";

function App() {
  return (
    <div className="dashboard">
      <div className="left-panel">
        <LeftForm />
      </div>

      <div className="right-panel">
        <ChatPanel />
      </div>
    </div>
  );
}

export default App;
