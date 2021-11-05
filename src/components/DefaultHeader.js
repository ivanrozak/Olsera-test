import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { deleteUser } from '../redux/global/action';
import { useDispatch } from 'react-redux';
import { FavoriteBorder } from '@mui/icons-material';

function DefaultHeader(props) {
  let location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(deleteUser());
  };
  return (
    <>
      {location.pathname === '/login' ? null : (
        <Box sx={{ flexGrow: 1, marginBottom: '15px' }}>
          <AppBar position='static'>
            <Container>
              <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  {location.pathname === '/admin' ? 'Admin' : 'Home'}
                </Typography>

                <div>
                  <IconButton
                    color='inherit'
                    variant='outlined'
                    component={Link}
                    to='/liked-post'
                  >
                    <FavoriteBorder />
                  </IconButton>

                  {props.isLoggedIn ? (
                    <Button
                      variant='outlined'
                      color='inherit'
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      color='inherit'
                      component={Link}
                      to='/login'
                    >
                      Login
                    </Button>
                  )}
                </div>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      )}
    </>
  );
}

export default DefaultHeader;
