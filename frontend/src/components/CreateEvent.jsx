import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    
    if (!token) {
      alert("Необходимо войти в систему");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/events/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Событие успешно создано!');
      navigate('/'); 
    } catch (err) {
      alert('Ошибка при создании. Проверьте заполнение полей.');
    }
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '40px auto', 
      padding: '40px', 
      background: '#ffffff', 
      borderRadius: '20px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      border: '1px solid #f0f0f0'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#2d3436', 
        fontWeight: '500', 
        marginBottom: '30px',
        letterSpacing: '1px'
      }}>
        НОВОЕ СОБЫТИЕ
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Название мероприятия" 
          required
          style={inputStyle}
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
        />
        
        <textarea 
          placeholder="Описание" 
          rows="4"
          required
          style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
        />

        <input 
          type="text" 
          placeholder="Место проведения" 
          required
          style={inputStyle}
          onChange={(e) => setFormData({...formData, location: e.target.value})} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '12px', color: '#b2bec3', marginLeft: '15px' }}>ДАТА ПРОВЕДЕНИЯ</label>
          <input 
            type="date" 
            required
            style={inputStyle}
            onChange={(e) => setFormData({...formData, date: e.target.value})} 
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            marginTop: '10px', 
            padding: '15px', 
            background: '#e1f5fe', 
            color: '#0288d1', 
            border: 'none', 
            borderRadius: '15px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#b3e5fc'}
          onMouseOut={(e) => e.target.style.background = '#e1f5fe'}
        >
          ОПУБЛИКОВАТЬ
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '15px',
  borderRadius: '12px',
  border: '1px solid #f0f0f0',
  background: '#fcfcfc',
  fontSize: '14px',
  outline: 'none',
  transition: 'border 0.3s ease',
  color: '#4a4a4a'
};

export default CreateEvent;