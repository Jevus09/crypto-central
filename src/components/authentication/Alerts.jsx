import React from 'react'
import { CryptoState } from '../context/CryptoContext'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'


function Alerts() {
    const {alerts, setAlerts} = CryptoState()
    // const handleClick = () => {
    //     setOpen(true)
    // }
   
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setAlerts({
            open: false,

            
        })

    }

    


  return (
    <Snackbar
        open={alerts.open}
        autoHideDuration={3000}
        onClose={handleClose}
        style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}
    >
        <Alert
            onClose={handleClose}
            elevation={50}
            variant='filled'
            severity={alerts.type}
        >
            {alerts.message}
        </Alert>
    </Snackbar>
  )
}

export default Alerts