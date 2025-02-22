import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Dashboard from "../Routes/Dashboard";
import ChatApp from "../Component/Chatapp";
import Credit_score from "../Routes/Credit_score";
import Healthscore from "../Routes/Healthscore";
import { ChatProvider } from "../Context/ChatProvider";
import "./App.css";
import ChatWidget from "../Context/ChatWidget";

function App() {
  return (
    <ChatProvider>
      <Router>
        <div >
          <Sidebar />
          <div > {/* Adjust margin-left for sidebar width */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/credit" element={<Credit_score />} />
              <Route path="/health" element={<Healthscore/>} />
            </Routes>
          </div>
          {/* <ChatApp /> */}
          <ChatWidget/>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
