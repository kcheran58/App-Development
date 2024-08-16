import React from 'react';
import SuggestionItem from '../SuggestionItem/SuggestionItem';
import './SuggestionList.css';

const SuggestionList = ({ suggestions }) => {
  return (
    <section className="existing-suggestions">
      <h2>Existing Suggestions</h2>
      <input
        type="text"
        placeholder="Search Suggestions"
        className="su-search-bar"
      />
      <ul className="suggestion-list">
        {suggestions.map((suggestion, index) => (
          <SuggestionItem key={index} suggestion={suggestion} />
        ))}
      </ul>
    </section>
  );
};

export default SuggestionList;
