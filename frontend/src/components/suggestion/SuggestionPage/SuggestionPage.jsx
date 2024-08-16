import React, { useState } from 'react';
import SuggestionForm from '../SuggestionForm/SuggestionForm'
import SuggestionList from '../SuggestionList/SuggestionList';
import './SuggestionPage.css';

const SuggestionPage = () => {
  const [suggestions, setSuggestions] = useState([]);

  const addSuggestion = (newSuggestion) => {
    setSuggestions([...suggestions, newSuggestion]);
  };

  return (
    <div className="suggestions-page">
      <header className='h'>
        <h1>Suggestions and Feedback</h1>
        <p>Help us improve by sharing your ideas and feedback. Your input is valuable to us!</p>
      </header>
      <SuggestionForm addSuggestion={addSuggestion} />
      <SuggestionList suggestions={suggestions} />
    </div>
  );
};

export default SuggestionPage;
