import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { patchData, postData } from '../API/API';

function ModalCustom(props) {
  const { userId } = props;
  const { id } = useParams();

  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const handleClose = (e) => {
    e.stopPropagation();
    history.goBack();
    setOpen(false);
  };
  // const handleOk = () => console.log('ok');
  const myStyle = {
    backgroundColor: 'primary.dark',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const submit = (e) => {
    e.preventDefault();
    if (props.forEdit) {
      let payload = {
        title: title,
        body: body,
      };
      patchData(payload, id).then((res) => {
        if (res.status === 200) {
          alert(`${res.status} - Success Patch Data!!`);
          history.goBack();
        } else {
          alert('Terjadi kesalahan!!');
        }
      });
    } else {
      let payload = {
        title: title,
        body: body,
        userId: userId,
      };
      postData(payload).then((res) => {
        if (res.status === 201) {
          alert(`${res.status} - Success Post Data!!`);
          history.goBack();
        } else {
          alert('Terjadi kesalahan!!');
        }
      });
    }
  };

  useEffect(() => {
    if (props.forEdit) {
      let itemData = props.history.location.data.item;
      console.log(itemData);
      setTitle(itemData.title);
      setBody(itemData.body);
    }
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
          <Typography>{props.forEdit ? 'Edit Post' : 'Create Post'}</Typography>
          <IconButton color='inherit' onClick={handleClose} aria-label='close'>
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={(e) => submit(e)}>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin='normal'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label='Title'
              type='text'
              required
              fullWidth
              variant='standard'
            />
            <TextField
              margin='normal'
              id='body'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              label='Body'
              type='text'
              multiline
              required
              fullWidth
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default ModalCustom;
