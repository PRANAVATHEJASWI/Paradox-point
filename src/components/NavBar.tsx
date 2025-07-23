'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/NavBar.css';

export default function NavBar() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    router.push('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/P.-removebg-preview.png" alt="Logo" className="logo" />
        <span className="brand-name">Paradox-Point</span>
        <input type="text" placeholder="Search for stocks" className="search-bar" />
      </div>

      <div className="navbar-right">
        <div className="nav-item">Portfolio</div>
        <div className="nav-item">Gold</div>
        <div className="nav-item">Screener</div>
        <div className="nav-item">Credit</div>
        <div className="nav-item">More</div>

        {userName ? (
          <div className="auth-box">
            <span className="user-icon">👤</span>
            <span className="user-name">{userName}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => router.push('/')}>
            👤 Sign Up / Login
          </button>
        )}
      </div>
    </nav>
  );
}
