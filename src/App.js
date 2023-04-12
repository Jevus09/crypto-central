import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Routes, Route, useLocation} from 'react-router-dom';
import './App.css';
import Coin from './Pages/Coin'
import Coins from './components/coins/Coins';
import Navbar from './components/navbar/Navbar';
import Trending from './components/trending/Trending'
import Footer from './components/footer/Footer';
import Alert from './components/authentication/Alerts';




function App() {

const [coins, setCoins] = useState([])




const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'

const location = useLocation()



useEffect(() => {
  axios.get(url).then((response) => {
    setCoins(response.data)
    
  }).catch((error)=>{
    console.log(error)
  })

}, [])



  return (
    <div >
      <div className="back">
      <Navbar/>
      {location.pathname === '/' && <Trending coins={coins}/>}
    </div>
      <Routes>
        <Route path='/' element={<Coins coins={coins}/>}/>
        <Route path='/coin' element={<Coin/>} >
          <Route path=':coinID' element={<Coin/>} />
        </Route>
      </Routes>
      <Alert/>
      <Footer/>
    </div>
  );
}

export default App;
