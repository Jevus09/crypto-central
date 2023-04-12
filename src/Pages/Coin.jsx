import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Coin.css'
import DOMPurify from 'dompurify'
import { Button } from '@mui/material'
import Chart from '../components/graph/Graph'
import {CryptoState} from '../components/context/CryptoContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../components/firebase/firebase'


const Coin = () => {

  const params = useParams()
  const [coin, setCoin] = useState({})
  const { user, watchlist, setAlert } = CryptoState()

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinID}`




  useEffect(() => {
    axios.get(url).then((res) => {
      setCoin(res.data)
    }).catch((error) => {
      console.log(error)
    })
    // eslint-disable-next-line
  }, [])


 
    const inWatchlist = watchlist.includes(coin?.id)
    const addToWatchlist = async() =>  {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(coinRef, {coins:watchlist?[...watchlist, coin?.id] : [coin?.id]})
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist!`,
        type: 'success'
      })


    }catch(error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  const removeFromWatchlist = async() =>  {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch) => watch !== coin?.id)
      }, {merge: 'true'}
      )
      setAlert({
        open: true,
        message: `${coin.name} Removed from Watchlist!`,
        type: 'success'
      })


    }catch(error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }




  return (
    <div>
      <div className="coin-container">
        <div className="content">
          <h1>{coin.name}</h1>
        </div>
        <div className="content">
          <div className="rank">
            <span className="rank-btn">Rank # {coin.market_cap_rank}</span>
            <span>
            {user && (<Button
            variant='outlined'
            style={{
              width: '100%',
              height: 40,
              color: inWatchlist? 'white': 'black',
              fontWeight: '500',
              backgroundColor: inWatchlist? '#ff0000' : '#DAA400',
            }}
            onClick={ inWatchlist? removeFromWatchlist : addToWatchlist}

          >
            {inWatchlist ? 'Remove from Watchlist': 'add to watchlist'}
          </Button>
)}
            </span>
          </div>




          <div className="info">
            <div className="coin-heading">
              {coin.image ? <img src={coin.image.small} alt='' /> : null}
              <p>{coin.name}</p>
              {coin.symbol ? <p>{coin.symbol.toUpperCase()}</p> : null}
            </div>
            <div className="coin-price">
              {coin.market_data?.current_price ? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
            </div>
          </div>
        </div>
        <div className="content">
        <Chart/>
        </div>
        <div className="content">
          <div className="stats">
            <div className="left">
              <div className="row">
                <h4>24 Hour Low</h4>
                {coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
              </div>
              <div className="row">
                <h4>24 Hour High</h4>
                {coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
              </div>
            </div>
            <div className="right">
              <div className="row">
                <h4>Market Cap</h4>
                {coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
              </div>
              <div className="row">
                <h4>Circualing Supply</h4>
                {coin.market_data?.circulating_supply ? <p>{coin.market_data.circulating_supply.toLocaleString()}</p> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
            }}></p>
          </div>
        </div>



      </div>



    </div>
  )
}

export default Coin