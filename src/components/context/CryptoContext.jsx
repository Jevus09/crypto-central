import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import axios from 'axios'


const Crypto = createContext()

function CryptoContext({children}) {
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    const [alerts, setAlerts] = useState({
        open: false,
        message: '',
        type: 'success',
                    
    })


    const [coins, setCoins] = useState([])
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'

    useEffect(() => {
        axios.get(url).then((response) => {
          setCoins(response.data)
          
        }).catch((error)=>{
          console.log(error)
        })
      
      }, [])








    useEffect(() => {
        if (user) {
            const coinRef = doc(db, 'watchlist', user?.uid)

            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()){
                    console.log('watch', coin.data().coins)
                    setWatchlist(coin.data().coins)
                } else {
                    console.log('No items in the Watchlist')
                }
            })
            return () => {
                unsubscribe()

        }

        }
    }, [user])  

    useEffect(() => {
        onAuthStateChanged(auth,  (user) => {
            if (user) setUser(user)
            else setUser(null)
        })
    }, [])


  return (
    <Crypto.Provider value={{
        alerts, 
        setAlerts,
        user,
        watchlist,
        coins,
        setCoins


    }}>
        {children}

    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}