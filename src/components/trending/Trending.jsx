import React from 'react'
import './Trending.css'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import Coin from '../../Pages/Coin'

const Trending = (props) => {

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }

    const items = props.coins.map((coin) => (
        <div className="coitainer-slider">
        <Link className='carousel-item' to={`/coin/${coin.id}`} element={<Coin />} key={coin.id}>
                    <img src={coin.image} alt="" />
                    <p>{coin.symbol.toUpperCase()}</p>
                <p style={{
                    color: coin.price_change_percentage_24h > 0 ? "rgb(14, 203, 129" : "red"
                }}
                >{coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%</p>
                <p>${coin.current_price.toLocaleString()}</p>
        </Link>
        </div>
    )
    

    );


return (

        <AliceCarousel
            mouseTracking
            autoPlay
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            responsive={responsive}
            items={items.sort(() => Math.random() - 0.5)}
            disableButtonsControls
        
        />

)

}
export default Trending