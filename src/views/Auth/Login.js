import React, { useState } from 'react';
import { Card, TextField, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
// import { getUserData } from '../../API/API';
import { getUser } from '../../redux/global/action';
import { useDispatch } from 'react-redux';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    console.log(userId, email);
    // getUserData(parseInt(userId)).then((res) => {
    //   console.log(res.data);
    //   let dataNew = JSON.stringify(res.data);
    //   localStorage.setItem('user', dataNew);
    // });
    dispatch(getUser(userId));
  };
  // function getLocalStorage() {
  //   const data = localStorage.getItem('user');
  //   console.log(JSON.parse(data));
  // }
  return (
    <div id='login'>
      <Card sx={{ p: 2 }}>
        <form className='form' onSubmit={(e) => submit(e)}>
          <Typography
            align='center'
            variant='h6'
            style={{ fontWeight: 'bold' }}
          >
            Login Page
          </Typography>
          <TextField
            autoFocus
            margin='normal'
            id='userId'
            label='User Id'
            type='text'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            variant='standard'
            required
          />
          <TextField
            margin='normal'
            id='email'
            label='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            fullWidth
            required
            variant='standard'
          />
          <Button type='submit' variant='contained' sx={{ mt: 5, mb: 2 }}>
            LOGIN
            {/* <CircularProgress sx={{ ml: 2 }} color='inherit' size={20} /> */}
          </Button>
          <Button
            type='button'
            variant='outlined'
            onClick={() => history.goBack()}
          >
            CANCEL
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
