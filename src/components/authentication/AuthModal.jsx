import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AppBar, Backdrop, Box, Fade, Tab, Tabs, } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { CryptoState } from '../context/CryptoContext';
import './AuthModal.css'


  






export default function AuthModal() {



  const {setAlerts} = CryptoState()
  const googleProvider = new GoogleAuthProvider()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => { setValue(newValue) }

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res => {
      setAlerts({
        open: true,
        message: `Sign up Successfull. Welcome ${res.user.email}`,
        type: 'success'
      })
      handleClose()
    }).catch(error => {
      setAlerts({
        open: true,
        message: error.message,
        type: 'error'
      })
    })

  }



  return (
    <div>
      <Button variant='contained'
        style={{
          display: 'flex',
          marginRight: 190,
          width: 85,
          color: 'black',
          height: 40,
          backgroundColor: '#DAA400',
        }}
        onClick={handleOpen}>Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='modal'
        closeAfterTransition
        slots={Backdrop}
        slotProps={{ timeout: 500 }}
      >

        <Fade in={open} >
          <div className='paper'
            style={{
              width: 400,
              borderRadius: 10,
              backgroundColor: '#26272b',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '2px solid #000',
          
            }}

          >
            <AppBar
              position='static'
              style={{ backgroundColor: 'transparent', color: 'white !important' }}
            >

              <Tabs value={value}
                onChange={handleChange}
                variant='fullWidth'
                style={{ borderRadius: 10, }} >
                <Tab label='Login' style={{color:"white"}} />
                <Tab label='Sign Up' style={{color:"white"}} />
              </Tabs>
            </AppBar>

            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box className='google'
              style={{
                padding: 24,
                paddingTop: 0,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                gap: 20,
                fontSize: 20

              }}
            >
              <span>
                OR
              </span>
              <GoogleButton
                style={{
                  width: '100%', outline: 'none',
                }}
                onClick={signInWithGoogle}
              />
            </Box>

          </div>

        </Fade>






      </Modal>
    </div>
  );
}