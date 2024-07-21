import React from "react";
import "./Button.css";

const OutlineButton = ({ text, onClick, bgcolor, textColor }) => {
  return (
    <div
      className="outLineBtnContainer"
      onClick={onClick}
      style={{ backgroundColor: bgcolor, color: textColor }}
    >
      <h5>{text}</h5>
    </div>
  );
};

export default OutlineButton;
