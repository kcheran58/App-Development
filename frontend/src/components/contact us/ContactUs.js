import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '600px',marginTop:'100px'}}>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              variant="outlined"
              // Add necessary props and state for handling input
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              variant="outlined"
              // Add necessary props and state for handling input
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              // Add necessary props and state for handling input
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              // Add necessary props and state for handling input
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactUs;
