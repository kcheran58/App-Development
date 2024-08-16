import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from '../../redux/slice/loggedSlice';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../redux/slice/userSlice';

const sidebarItems = [
  { text: 'Home', icon: <HomeIcon />, link: '/' },
  { text: 'About', icon: <InfoIcon />, link: '/aboutus' },
  { text: 'Work', icon: <WorkIcon />, link: '/suggestion' },
  { text: 'Contact', icon: <ContactMailIcon />, link: '/contactus' },
];

const Sidebar = ({ open, onClose }) => {
  const isLogged = useSelector(state => state.logged);
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(deleteUser());
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: 340,
          backgroundColor: '#282c34',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {isLogged ? (
        <div style={{ padding: 16, display: 'flex', alignItems: 'center' }}>
          <Avatar alt="User Profile" src={user.profilePic || "https://via.placeholder.com/100"} sx={{ width: 106, height: 106 }} />
          <div style={{ marginLeft: 16 }}>
            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
            <div style={{ fontSize: '0.875rem' }}>{user.email}</div>
          </div>
        </div>
      ) : (
        <Button sx={{ color: 'white', fontSize: '30px', textAlign: 'center' }} to="/login" component={Link}>
          SignIn<LoginIcon sx={{ height: '100px' }} />
        </Button>
      )}
      <Divider sx={{ backgroundColor: '#444c5c' }} />
      <List sx={{ flexGrow: 1 }}>
        {sidebarItems.map((item) => (
          <ListItem
            button
            key={item.text}
            to={item.link}
            component={Link}
            sx={{
              '&:hover': {
                backgroundColor: '#444c5c',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: '#fff' }} />
          </ListItem>
        ))}
        {isLogged && (
          <ListItem
            button
            to="/saved"
            component={Link}
            sx={{
              '&:hover': {
                backgroundColor: '#444c5c',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}><BookmarkIcon /></ListItemIcon>
            <ListItemText primary="Saved Messages" sx={{ color: '#fff' }} />
          </ListItem>
        )}
      </List>
      {isLogged && (
        <Button sx={{ color: 'white', fontSize: '20px', width: '100%', height: '50px' }} onClick={handleLogout}>
          <LogoutIcon sx={{ height: '40px', width: '40px' }} />
        </Button>
      )}
    </Drawer>
  );
};

export default Sidebar;
