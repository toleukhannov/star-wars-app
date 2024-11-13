import React from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import mainImg from './../static/mainPage.png'
import './ProfilePage.css'

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Header/>
      <div className='container'>
        <div className='main-page__wrapper'>
        <img className='main-page__img' src={mainImg} alt=''/>
        <div className='main-page__right'>
          <h1>Добро пожаловать, {user.username}!</h1>
          <br />
          <Link to="/characters">Перейти к персонажам</Link>
          <br />
          <Link to="/planets">Перейти к планетам</Link>
          <br />
          <Link to="/starships">Перейти к космическим кораблям</Link>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ProfilePage;
