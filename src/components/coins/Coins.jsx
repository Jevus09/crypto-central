import {React, useState} from 'react'
import './Coins.css'
import CoinItem from '../coinitem/CoinItem'
import { Link } from 'react-router-dom'
import Coin from '../../Pages/Coin'
import {Pagination} from '@mui/material'





const Coins = (props) => {

  const [page, setPage] = useState(1)

  const item = (
    <div className='container'>
      <div>
        <div className="heading">
          <p>#</p>
          <p className='coin-name'>Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className='hide-mobile'>Volume</p>
          <p className='hide-mobile'>Market Cap</p>
        </div>

        {props.coins.slice((page -1) * 10, (page - 1) * 10 + 10).map(coins => {
          return (
            <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id}>
              <CoinItem coins={coins} />
            </Link>
          )
        })}
      </div>
        <Pagination 
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          count={10}
          color="primary"
          onChange={(_, value) =>{
            setPage(value);
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }

          }

        />
    </div>

  )

  return (
    <div>{item}</div>
  )
}

export default Coins