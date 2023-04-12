import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CryptoState } from '../context/CryptoContext';
import {createUserWithEmailAndPassword} from '@firebase/auth'
import {auth} from '../firebase/firebase'

function SignUp({handleClose}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const {setAlerts} = CryptoState()

    


    const handleSubmit = async () =>{
        if (password !== confirmpassword) {
            setAlerts ({
                open: true,
                message: 'Passwords do not match',
                type: 'error'
            })
            return
        } 
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)

            setAlerts({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: 'success'
            })
            handleClose()
        } catch(error){
            setAlerts({
                open: true,
                message: error.message,
                type: 'error'
            })

        }
    }



  return (
    <Box p={3} style={{display:'flex', flexDirection: 'column', gap: '20px'}} >

        <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            InputLabelProps={{
                style: { color: 'white' },
              }}
            InputProps = {{
                style: {color: 'white'}
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            style={{
                color:'white',
                backgroundColor: 'rgba(0, 0, 0, .15)'

            }}
        >
        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            InputLabelProps={{
                style: { color: 'white' },
              }}
            InputProps = {{
                style: {color: 'white'}
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{
                color:'white',
                backgroundColor: 'rgba(0, 0, 0, .15)'

            }}
        >
        </TextField>
        <TextField
            variant='outlined'
            type='password'
            label='Confirm Password'
            InputLabelProps={{
                style: { color: 'white' },
              }}
            InputProps = {{
                style: {color: 'white'}
            }}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            style={{
                color:'white',
                backgroundColor: 'rgba(0, 0, 0, .15)'

            }}
        >
        </TextField>

        <Button 
            variant='contained'
            size='large'
            style={{backgroundColor: '#EEBC1D', color:'black'}}
            onClick={handleSubmit}

            >
            Sign Up
        </Button>

    </Box>
  )
}

export default SignUp