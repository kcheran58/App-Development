import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import TextField from '@mui/material/TextField';
import './Registration.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/slice/userSlice';
import { logIn } from '../../redux/slice/loggedSlice';
import { Link, useNavigate } from 'react-router-dom';
const Registration = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!name) tempErrors.name = "Full name is required.";
    if (!username) tempErrors.username = "Username is required.";
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!phoneNumber) tempErrors.phoneNumber = "Phone number is required.";
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validate()) {
      const userData = { fullName:name, userName:username, email, phoneNumber, password};
       const response=await axios.post('http://localhost:3500/users',userData);
       dispatch(addUser(response.data));
       dispatch(logIn());
       navigate("/");
      console.log("Form is valid. User data:", userData);
    } else {
      console.log("Form is invalid.");
    }
  };

  return (
    <div className='body1'>
      <div className='form-container'>
        <div className='form-image'>
          {/* <img src='path_to_your_image.jpg' alt='Registration' /> */}
        </div>
        <div className='form-content'>
          <div id='content'></div>
          <div id='reg'>
            <div className='form-items1'>
              <h2>Registration</h2>
            </div>
            <div className='form-items1'>
              <label className='label1' htmlFor='name'>
                <b>Full Name:</b>
                <TextField
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='text1'
                  label='Full Name'
                  variant='outlined'
                  error={!!errors.name}
                  helperText={errors.name}
                  aria-required
                />
              </label>
              <label className='label1' htmlFor='username'>
                <b>UserName:</b>
                <TextField
                  id='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='text1'
                  label='User Name'
                  variant='outlined'
                  error={!!errors.username}
                  helperText={errors.username}
                  aria-required
                />
              </label>
            </div>
            <div className='form-items1'>
              <label className='label1' htmlFor='email'>
                <b>Email:</b>
                <TextField
                  className='text1'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label='Email'
                  type='email'
                  variant='outlined'
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </label>
              <label className='label1' htmlFor='phoneNumber'>
                <b>Phone Number:</b>
                <TextField
                  className='text1'
                  id='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  label='Phone Number'
                  variant='outlined'
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  aria-required
                />
              </label>
            </div>
            <div className='form-items1'>
              <label className='label1' htmlFor='password'>
                <b>Password:</b>
                <TextField
                  className='text1'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label='Password'
                  type='password'
                  variant='outlined'
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </label>
              <label className='label1' htmlFor='confirmPassword'>
                <b>Confirm Password:</b>
                <TextField
                  className='text1'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label='Confirm Password'
                  type='password'
                  variant='outlined'
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  aria-required
                />
              </label>
            </div>
            <div className='form-items1'>
              <label className='label1' htmlFor='gender'>
                <b>Gender:</b>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      sx={{ margin: '0 20px' }}
                      value='female'
                      control={<Radio />}
                      label='Female'
                    />
                    <FormControlLabel
                      className='radio'
                      value='other'
                      control={<Radio />}
                      label='Prefer not to say'
                    />
                  </RadioGroup>
                </FormControl>
              </label>
            </div>
            <div className='form-items'>
              <Button
                className='Button'
                sx={{
                  margin: '50px 10px',
                  transition: '0.2s'
                }}
                variant='contained'
                onClick={handleSubmit}
              >
                REGISTER
              </Button>
            </div>
            <div className='form-items' style={{textAlign:'center'}}>
              <p className='signin-text'>
                <Link to="/login" component={Link}>Already signed in? </Link>       
              </p>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
};

export default Registration;
