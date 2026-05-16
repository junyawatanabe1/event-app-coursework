import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventList from './components/EventList';
import Login from './components/Login';
import Register from './components/Register';
import CreateEvent from './components/CreateEvent';

function App() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: '"Inter", sans-serif' }}>
        
        <header style={headerStyle}>
          <div style={logoStyle}>МОИ МЕРОПРИЯТИЯ</div>

          {}
          <div 
          className="burger-icon" 
          style={burgerIconStyle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
          <div style={lineStyle(isMenuOpen)}></div>
          <div style={lineStyle(isMenuOpen)}></div>
          <div style={lineStyle(isMenuOpen)}></div>
          </div>

          {}
          <nav style={navContainerStyle(isMenuOpen)}>
            <Link to="/" style={navLinkStyle} onClick={closeMenu}>ГЛАВНАЯ</Link>
            <Link to="/create" style={navLinkStyle} onClick={closeMenu}>СОЗДАТЬ</Link>
            
            {user ? (
              <div style={userActionsStyle}>
                <span style={userBadgeStyle}>● {user}</span>
                <button onClick={() => { handleLogout(); closeMenu(); }} style={logoutButtonStyle}>ВЫЙТИ</button>
              </div>
            ) : (
              <div style={authButtonsStyle}>
                <Link to="/register" style={navLinkStyle} onClick={closeMenu}>РЕГИСТРАЦИЯ</Link>
                <Link to="/login" style={{ ...navLinkStyle, ...loginButtonStyle }} onClick={closeMenu}>ВХОД</Link>
              </div>
            )}
          </nav>
        </header>

        {}
        {isMenuOpen && <div style={overlayStyle} onClick={closeMenu}></div>}

        <main style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateEvent />} />
          </Routes>
        </main>
      </div>

      {}
      <style>{`
        @media (max-width: 820px) {
          header { padding: 0 20px !important; }
          nav {
            position: fixed;
            top: 80px;
            right: ${isMenuOpen ? '0' : '-100%'};
            flex-direction: column;
            background: white;
            width: 70%;
            height: calc(100vh - 80px);
            padding: 40px 20px !important;
            box-shadow: -10px 0 30px rgba(0,0,0,0.05);
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            gap: 30px !important;
            align-items: flex-start !important;
          }
          .burger-icon { display: flex !important; }
        }
      `}</style>
    </Router>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 60px',
  height: '80px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 15px rgba(0,0,0,0.03)',
  position: 'relative',
  zIndex: 1001
};

const logoStyle = { fontSize: '18px', fontWeight: '600', color: '#2d3436', letterSpacing: '2px' };

const navContainerStyle = (isOpen) => ({
  display: 'flex',
  gap: '40px',
  alignItems: 'center',
});

const burgerIconStyle = {
  display: 'none', 
  flexDirection: 'column',
  gap: '6px',
  cursor: 'pointer',
  padding: '10px',
  className: 'burger-icon' 
};

const lineStyle = (isOpen) => ({
  width: '25px',
  height: '2px',
  backgroundColor: '#636e72',
  transition: '0.3s'
});

const userActionsStyle = { display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' };
const authButtonsStyle = { display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' };

const userBadgeStyle = {
  fontSize: '11px', color: '#0288d1', fontWeight: '600',
  padding: '5px 12px', background: '#e1f5fe', borderRadius: '10px', textTransform: 'uppercase'
};

const navLinkStyle = { textDecoration: 'none', color: '#636e72', fontSize: '13px', fontWeight: '500', letterSpacing: '1px' };

const loginButtonStyle = { padding: '10px 25px', borderRadius: '25px', backgroundColor: '#e1f5fe', color: '#0288d1' };

const logoutButtonStyle = { background: 'none', border: 'none', color: '#ff7675', fontSize: '11px', fontWeight: '700', cursor: 'pointer' };

const mainContentStyle = { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' };

const overlayStyle = {
  position: 'fixed', top: '80px', left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.1)', zIndex: 999
};

export default App;