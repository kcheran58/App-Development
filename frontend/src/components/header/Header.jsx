import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css'; 
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

const Header = () => {
  const isLogged = useSelector(state => state.logged);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <AppBar className="app-bar" sx={{ backgroundColor: 'black', position: 'fixed' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarOpen} className="menu-button">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className="app-bar-title" sx={{fontFamily: 'italy'}} component={Link} to="/">
            <img src="https://wallpapers.com/images/thumbnail/religious-text-overlay-n4pwj214hepm7bpr.webp" alt="e.png" style={{width:'30px',height:'40px'}}/>
            Share
          </Typography>
          <div className="search-bar">
            <SearchIcon />
            <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </div>
          <div className="auth-buttons">
            <Button color="inherit" to="/post" component={Link}>Post</Button>
            {isLogged ? (
              <Button to="/profile" component={Link}>
                <AccountCircleIcon sx={{ height: '50px', width: '50px', borderRadius: '100%' }} />
              </Button>
            ) : (
              <>
                <Button color="inherit" className="login-button" to="/login" component={Link}>Login</Button>
                <Button color="inherit" className="signup-button" to="/signup" component={Link}>Sign Up</Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default Header;
