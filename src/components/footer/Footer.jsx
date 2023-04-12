 /* eslint-disable */
import React from 'react'
import './Footer.css'
import {FaCoins} from 'react-icons/fa'

const Footer = () => {
  return (
    
    <footer>      
      <a href='#' className='footer_logo'><FaCoins className='icon'/></a>
      <div className="footer_copyright">
        <small> Copyright &copy; 2022 CryptoCentral. All rights reserved</small>
      </div>



    </footer>
  )
}

export default Footer