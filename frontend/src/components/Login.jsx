import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('username', username);
      alert('Успешный вход!');
      window.location.href = '/';
    } catch (err) {
      alert('Ошибка входа. Проверьте логин и пароль.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={formTitleStyle}>ВХОД В АККАУНТ</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input 
          type="text" 
          placeholder="Логин" 
          required 
          style={inputStyle}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          required 
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" style={primaryButtonStyle}>ВОЙТИ</button>
      </form>
    </div>
  );
}

export const formContainerStyle = {
  maxWidth: '400px',
  margin: '40px auto',
  padding: '40px',
  background: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  border: '1px solid #f0f0f0'
};

export const formTitleStyle = {
  textAlign: 'center',
  color: '#2d3436',
  fontWeight: '500',
  marginBottom: '30px',
  letterSpacing: '1px'
};

export const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };

export const inputStyle = {
  padding: '15px',
  borderRadius: '12px',
  border: '1px solid #f0f0f0',
  background: '#fcfcfc',
  fontSize: '14px',
  outline: 'none',
  color: '#4a4a4a'
};

export const primaryButtonStyle = {
  marginTop: '10px',
  padding: '15px',
  background: '#e1f5fe',
  color: '#0288d1',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  letterSpacing: '1px'
};

export default Login;