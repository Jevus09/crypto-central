import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../context/CryptoContext';
import { Avatar, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import './UserSidebar.css'
import { AiFillDelete } from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';


export default function UserSidebar() {
    const { user, setAlerts, watchlist, coins } = CryptoState()
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth)
        setAlerts({
            open: true,
            type: 'success',
            message: 'Logout Successfull'
        })

        toggleDrawer()

    }


    const removeFromWatchlist = async(coin) =>  {
        const coinRef = doc(db, 'watchlist', user.uid)
    
        try {
          await setDoc(coinRef, {
            coins: watchlist.filter((watch) => watch !== coin?.id)
          }, {merge: 'true'}
          )
          setAlerts({
            open: true,
            message: `${coin.name} Removed from Watchlist!`,
            type: 'success'
          })
    
    
        }catch(error) {
          setAlerts({
            open: true,
            message: error.message,
            type: 'error'
          })
        }
      }
    
    




    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 60,
                            width: 60,
                            display: 'flex',
                            marginTop: 25,
                            marginRight: 190,
                            cursor: 'pointer',
                            backgroundColor: '#EEBC1D'
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}


                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className= 'container-sidebar'>
                            <div className= 'profile'                            >
                                <Avatar
                                    className='photo'
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}

                                />

                                <span className='name'>
                                    {user.displayName || user.email}
                                </span>
                                <div className='watchlist'>
                                    <span
                                        style={{
                                            fontSize: 30,
                                            marginBottom: 20,
                                            textShadow: '0 0 5px black',
                                        }}
                                    >
                                        Watchlist


                                    </span>

                                    {
                                        coins.map(coin => {
                                            if (watchlist.includes(coin.id)) {
                                                return (
                                                    <div className="coin">
                                                        <span>{coin.name}</span>
                                                        <span
                                                            style={{ display: 'flex', gap: 10}}                                                    >   
                                                            ${coin.current_price.toLocaleString()}
                                                            <AiFillDelete
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    fontSize: '16',
                                                            
                                                                }}
                                                                onClick={() => removeFromWatchlist(coin)}
                                                            />
                                                        </span>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })
                                    }

                                </div>
                            </div>
                            <Button
                                className='logout'
                                variant='contained'
                                onClick={logOut}
                                style={{
                                    height: '4%',
                                    color: 'black',
                                    width: '100%',
                                    backgroundColor: '#EEBC1D',
                                    marginTop: 20,
                                }}

                            >
                                logout
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}