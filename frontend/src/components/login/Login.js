import React, { useState } from "react";
import './Login.css';
import { Button, Input } from "@mui/material";
import { FacebookRounded, Google, Instagram } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slice/userSlice";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../redux/slice/loggedSlice";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = async () => {
    try {
      const response = await axios.post('http://localhost:3500/users/login', { userName: username, password: password });
      const userData = response.data;

      if (userData) {
        dispatch(addUser(userData));
        dispatch(logIn());
        navigate('/');
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(true);
    }
  }

  return (
    <div className="lo">
      <div className="lo-body">
        <div id='lo-content'></div>
        <div id='lo-login'>
          <div className="lo-login-items"><h1>Login</h1></div>
          <div className="lo-login-items">
            <Input
              placeholder="Username"
              style={{ width: '250px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="lo-login-items">
            <Input
              type="password"
              placeholder="Password"
              style={{ width: '250px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> 
          {error && (
            <pre className="lo-login-items" style={{ color: 'red', width: '250px', height: '20px', fontSize: '10px' }}>
              <b>Username & password are incorrect</b>
            </pre>
          )}
          <div className="lo-login-items">
            <Button
              style={{ backgroundColor: 'blue', color: 'white', fontSize: 'medium', width: '150px' }}
              onClick={handleChange}
            >
              <b>LOGIN</b>
            </Button>
          </div>
          <div><h4>or</h4></div>
          <div style={{marginTop:'-50px'}}><p><Link to="/signup" component={Link}>create a new account?</Link></p></div>
          <div><hr width='50px' style={{ marginTop: '-20px' }} /></div>
          <div style={{ marginTop: '-20px' }} className="lo-login-items">
            <Button style={{ borderRadius: '100%' }}> <FacebookRounded /> </Button>
            <Button style={{ borderRadius: '100%' }}> <Google /> </Button>
            <Button style={{ borderRadius: '100%' }}> <Instagram /> </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
