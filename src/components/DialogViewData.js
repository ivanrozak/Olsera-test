import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { getCommentData } from '../redux/global/action';
import { useDispatch, useSelector } from 'react-redux';

function DialogViewData(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  let itemData = props.history.location.data.item;

  const [open, setOpen] = useState(true);
  const comments = useSelector((state) => state.global.dataState.comments);

  const handleClose = (e) => {
    e.stopPropagation();
    history.goBack();
    setOpen(false);
  };

  const myStyle = {
    backgroundColor: 'primary.dark',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  useEffect(() => {
    dispatch(getCommentData(1));
  }, []);
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle sx={myStyle} onClose={handleClose}>
          <Typography>View Post</Typography>
          <IconButton color='inherit' onClick={handleClose} aria-label='close'>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant='h4' mb={2}>
            {itemData.title}
          </Typography>
          <Typography variant='subtitle'>{itemData.body} </Typography>

          <Typography variant='h6' mt={2}>
            Comments
          </Typography>
          {comments.map((item, index) => (
            <div key={index}>
              <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
                {item.name.slice(0, 15)}
              </Typography>
              <Typography variant='subtitle2'>{item.body}</Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleClose} variant='contained'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogViewData;
