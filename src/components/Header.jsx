import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

  return (
    <div className='header'>
      <div className='container'>
        <div className='header__wrapper'>
            <p><Link to="/profile">SOLVA TECH  - тестовое задание</Link></p>
            <button className='logout__btn' onClick={handleLogout}>Выйти</button>
        </div>
      </div>
    </div>
  )
}

export default Header
