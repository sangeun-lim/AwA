import React from "react";
import { Link } from "react-router-dom";
import "./Preview.module.css";

function Preview(): JSX.Element {
  return (
    <div>
      <h1>preview</h1>
      <button className="previewBtn">
        <Link to="/auth/login">LogIn</Link>
      </button>
      <button className="previewBtn">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}

export default Preview;
