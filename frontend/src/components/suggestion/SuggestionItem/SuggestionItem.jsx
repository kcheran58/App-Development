import React from 'react';
import './SuggestionItem.css';

const SuggestionItem = ({ suggestion }) => {
  return (
    <li className="suggestion-item">
      <h3>{suggestion.title}</h3>
      <p>{suggestion.description}</p>
      <span>Type: {suggestion.type}</span>
      <span>Priority: {suggestion.priority}</span>
      {/* Add voting or commenting options here */}
    </li>
  );
};

export default SuggestionItem;
