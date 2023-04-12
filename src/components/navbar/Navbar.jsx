import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import {FaCoins} from 'react-icons/fa'
import AuthModal from '../authentication/AuthModal'
import { CryptoState } from '../context/CryptoContext'
import UserSidebar from '../authentication/UserSidebar'

const Navbar = () => {

  const {user} = CryptoState()

  return (
    <div className="container-nav">
    <Link to='/'>
        <div className="navbar">
            <FaCoins className='icon'/>
            <h1>Crypto <span className="purple">Central</span></h1>

        </div>
    </Link>
    <div className="login">
    {user ? <UserSidebar/> : <AuthModal />}

    </div>
    </div>
  )
}

export default Navbar