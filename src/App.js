import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

import './App.css';

import Home from './views/HomePage/Home';
import AdminPage from './views/AdminPage/AdminPage';
import Login from './views/Auth/Login';
import DefaultHeader from './components/DefaultHeader';
import LikedPost from './views/LikedPost/LikedPost';

function App() {
  const user = useSelector((state) => state.global.dataState.user);
  const [isLoggedIn, setData] = useState(false);
  useEffect(() => {
    function getUser() {
      const userLS = JSON.parse(localStorage.getItem('user'));
      if (user.id) {
        setData(true);
        if (!userLS) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      } else if (userLS) {
        setData(true);
      } else {
        console.log('kaga ada');
        setData(false);
      }
    }
    getUser();
  }, [user]);
  return (
    <BrowserRouter>
      <DefaultHeader isLoggedIn={isLoggedIn} />
      <Container>
        <Switch>
          <Route path='/' exact>
            <Home name='Homepage' />
          </Route>
          <Route path='/liked-post' exact>
            <LikedPost />
          </Route>
          {isLoggedIn ? (
            <Route
              path='/admin'
              exact
              render={(props) => <AdminPage {...props} name='Admin Page' />}
              // element={<Home />}
            />
          ) : (
            <Redirect from='/admin' to='/login' />
          )}
          {!isLoggedIn ? (
            <Route
              path='/login'
              exact
              render={(props) => <Login {...props} />}
              // element={<Home />}
            />
          ) : (
            <Redirect from='/login' to='/admin' />
          )}
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
