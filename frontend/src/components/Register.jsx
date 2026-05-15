import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formContainerStyle, formTitleStyle, formStyle, inputStyle, primaryButtonStyle } from './Login';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', { username, password });
      alert('Регистрация завершена!');
      navigate('/login');
    } catch (err) {
      alert('Ошибка при регистрации.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={formTitleStyle}>РЕГИСТРАЦИЯ</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input 
          type="text" 
          placeholder="Придумайте логин" 
          required 
          style={inputStyle}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Придумайте пароль" 
          required 
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" style={primaryButtonStyle}>СОЗДАТЬ АККАУНТ</button>
      </form>
    </div>
  );
}

export default Register;