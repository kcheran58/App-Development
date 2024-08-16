import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, Button, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Slider } from '@mui/material';
import './Filter.css';

const Filter = ({ categories, selectedCategories, onCategoryChange, onClearFilters, selectedSortOption, onSortOptionChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([0, 100]); // assuming date range as percentage
  const [rating, setRating] = useState([0, 5]); // assuming rating range from 0 to 5

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateRangeChange = (event, newValue) => {
    setDateRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  // Ensure categories are unique
  const uniqueCategories = Array.from(new Set(categories));

  // Filter categories based on search term
  const filteredCategories = uniqueCategories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='filter-section'>
      <Typography variant="h6">Filter by Category</Typography>
      <TextField
        label="Search Categories"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <List>
        {filteredCategories.map((category) => (
          <ListItem key={category} button onClick={() => onCategoryChange(category)}>
            <Checkbox checked={selectedCategories.includes(category)} />
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <Button onClick={onClearFilters} variant="outlined">
        Clear All Filters
      </Button>

      <FormControl fullWidth margin="normal">
        <InputLabel>Sort by</InputLabel>
        <Select
          value={selectedSortOption}
          onChange={(e) => onSortOptionChange(e.target.value)}
          label="Sort by"
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="mostLiked">Most Liked</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" marginTop={2}>Filter by Date Range</Typography>
      <Slider
        value={dateRange}
        onChange={handleDateRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        marks
        step={1}
      />

      <Typography variant="h6" marginTop={2}>Filter by Rating</Typography>
      <Slider
        value={rating}
        onChange={handleRatingChange}
        valueLabelDisplay="auto"
        min={0}
        max={5}
        marks
        step={0.1}
      />
    </div>
  );
};

export default Filter;
