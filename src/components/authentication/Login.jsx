import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CryptoState } from '../context/CryptoContext'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../firebase/firebase'

function Login({handleClose}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setAlerts} = CryptoState()

    const handleSubmit = async () =>{
        if (!email || !password) {
            setAlerts({
                open:true,
                message: 'Please fill all the Fields',
                type: 'error'
            })
            return 
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            setAlerts({
                open: true,
                message: `Log in Successful. Welcome ${result.user.email}`,
                type: 'success'
            })
            handleClose()

            
        } catch (error) {
            setAlerts({
                open: true,
                message: error.message,
                type: 'error'
        })
        return
        }
    }



  return (
    <Box p={3} style={{display:'flex', flexDirection: 'column', gap: '20px'}} >

        <TextField
            variant='outlined'
            
            type='email'
            label='Enter Email'
            InputLabelProps={{
                style: { color: 'white' }
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
        <Button 
            variant='contained'
            size='large'
            style={{backgroundColor: '#EEBC1D', color:'black'}}
            onClick={handleSubmit}
            >
            Log In
        </Button>

    </Box>
  )
}

export default Login