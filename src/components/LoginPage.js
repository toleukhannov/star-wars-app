import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Заглушка для авторизации
    if (data.username === 'admin' && data.password === '12345') {
      dispatch(login({ username: data.username }));
      navigate('/profile');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div className='login'>
      <div className='container'>
        <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
          <h1>АВТОРИЗАЦИЯ</h1>
          <div className='login__form-element'>
            <label>Имя пользователя</label>
            <input {...register('username', { required: true })} />
          </div>
          <div className='login__form-element'>
            <label>Пароль</label>
            <input type="password" {...register('password', { required: true })} />
          </div>
          <button className='submit__btn' type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
