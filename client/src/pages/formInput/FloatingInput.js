import React, { useState } from 'react';
import './FloatingInput.css'; 

const FloatingInput = ({ label, name, value, onChange,type ,placeholder}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`floating-label-input ${isFocused ? "focused" : ""}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={isFocused ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
      />
      <label>{label}</label>
    </div>
  );
};

export default FloatingInput;
