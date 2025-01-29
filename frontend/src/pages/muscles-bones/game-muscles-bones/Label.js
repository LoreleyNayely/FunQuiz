import React from 'react';
import './Label.css'; 

const Label = ({ label, selected, onSelect }) => {
  return (
    <div
      className={`label-item ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(label.id)}
      role="button"
      tabIndex="0"
    >
      {label.name}
    </div>
  );
};

export default Label;
