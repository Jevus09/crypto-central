import {React} from 'react'
import './CoinItem.css'




const CoinItem = (props) => {


   return (

    <div className="coin-row">
        <p>{props.coins.market_cap_rank}</p>
        <div className="img-symbol">
            <img src={props.coins.image} alt="" />
            <p>{props.coins.symbol.toUpperCase()}</p>
        </div>
        <p>${props.coins.current_price.toLocaleString()}</p>
        <p style={{
                    color: props.coins.price_change_percentage_24h > 0 ? "rgb(14, 203, 129" : "red"
                }}
                >{props.coins.price_change_percentage_24h > 0 ? '+' : ''}{props.coins.price_change_percentage_24h.toFixed(2)}%</p>
        <p className='hide-mobile'>${props.coins.total_volume.toLocaleString()}</p>
        <p className='hide-mobile'>${props.coins.market_cap.toLocaleString()}</p>
    </div>

  )
}

export default CoinItem