import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    axios.get('http://127.0.0.1:8000/api/events/')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Ошибка при получении данных:", err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access');
    
    if (!token) {
      alert("Удаление доступно только авторизованным пользователям!");
      return;
    }

    if (window.confirm("Вы уверены, что хотите удалить это мероприятие?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/events/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchEvents(); 
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert("Сессия истекла. Пожалуйста, войдите снова.");
        } else {
          alert("Ошибка при удалении. Возможно, у вас недостаточно прав.");
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
      {events.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {events.map(event => (
            <div key={event.id} style={cardStyle}>
              <div style={{ flexGrow: 1 }}>
                <h3 style={cardTitleStyle}>{event.title}</h3>
                <p style={cardDescriptionStyle}>{event.description}</p>
                
                <div style={cardFooterStyle}>
                  <div style={{ marginBottom: '8px' }}>📍 {event.location.toUpperCase()}</div>
                  <div>📅 {new Date(event.date).toLocaleDateString()}</div>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(event.id)} 
                style={deleteButtonStyle}
                onMouseOver={(e) => e.target.style.background = '#ffe5e5'}
                onMouseOut={(e) => e.target.style.background = '#fff0f0'}
              >
                УДАЛИТЬ
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={emptyStateStyle}>
          <h2 style={{ color: '#b2bec3', fontWeight: '400', letterSpacing: '2px', fontSize: '24px' }}>
            СОБЫТИЙ НЕТ!
          </h2>
          <p style={{ color: '#d1d8e0', fontSize: '14px' }}>Попробуйте создать новое мероприятие</p>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  padding: '30px',
  borderRadius: '20px',
  background: '#ffffff',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  border: '1px solid #f0f0f0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease'
};

const cardTitleStyle = {
  color: '#2d3436',
  marginTop: 0,
  fontSize: '20px',
  fontWeight: '500'
};

const cardDescriptionStyle = {
  color: '#b2bec3',
  fontSize: '14px',
  lineHeight: '1.6',
  marginBottom: '20px'
};

const cardFooterStyle = {
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: '1px solid #f9f9f9',
  fontSize: '12px',
  color: '#636e72',
  letterSpacing: '0.5px'
};

const deleteButtonStyle = {
  marginTop: '25px',
  background: '#fff0f0',
  color: '#ff7675',
  border: 'none',
  padding: '12px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '1px',
  transition: 'background 0.2s ease'
};

const emptyStateStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '100px'
};

export default EventList;