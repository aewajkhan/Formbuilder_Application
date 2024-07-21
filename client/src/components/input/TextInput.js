import React, { useState } from 'react';
import './TextInput.css';

const TextInput = ({ label, inputValue, handleChange, placeholder }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        className="input-field"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <label className={`placeholder ${inputValue ? 'active' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default TextInput;
