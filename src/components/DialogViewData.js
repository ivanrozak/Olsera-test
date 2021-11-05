import React from 'react';
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
import { useHistory } from 'react-router-dom';
import { Close } from '@mui/icons-material';

const FormCustom = () => (
  <div>
    <TextField
      autoFocus
      margin='dense'
      id='name'
      label='Email Address'
      type='email'
      fullWidth
      variant='standard'
    />
    <TextField
      autoFocus
      margin='dense'
      id='name'
      label='Email Address'
      type='email'
      fullWidth
      variant='standard'
    />
  </div>
);

function DialogViewData() {
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const handleClose = (e) => {
    e.stopPropagation();
    history.goBack();
    setOpen(false);
  };
  const handleOk = () => console.log('ok');
  const myStyle = {
    backgroundColor: 'primary.dark',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle sx={myStyle} onClose={handleClose}>
          <Typography>Post Data</Typography>
          <IconButton color='inherit' onClick={handleClose} aria-label='close'>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <FormCustom />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogViewData;
