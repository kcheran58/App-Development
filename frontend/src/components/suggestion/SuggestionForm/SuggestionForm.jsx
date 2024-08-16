import React, { useState } from 'react';
import './SuggestionForm.css';

const SuggestionForm = ({ addSuggestion }) => {
  const [type, setType] = useState('feature');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSuggestion = { type, title, description, priority };
    addSuggestion(newSuggestion);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="suggestion-form" onSubmit={handleSubmit}>
      <label htmlFor="suggestion-type">Suggestion Type:</label>
      <select
        id="suggestion-type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="feature">Feature Request</option>
        <option value="bug">Bug Report</option>
        <option value="feedback">General Feedback</option>
      </select>

      <label htmlFor="suggestion-title">Title:</label>
      <input
        type="text"
        id="suggestion-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="suggestion-description">Description:</label>
      <textarea
        id="suggestion-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="5"
        required
      ></textarea>

      <label htmlFor="suggestion-priority">Priority:</label>
      <select
        id="suggestion-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Submit Suggestion</button>
    </form>
  );
};

export default SuggestionForm;
