import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <h1>Welcome to Spinnie!</h1>
      <button onClick={() => navigate("/input")}>Get Started</button>
    </div>
  );
};

export default Welcome;
