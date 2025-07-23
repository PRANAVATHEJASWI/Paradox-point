'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './dashboard.css';
import NavBar from '@/components/NavBar';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (!name) {
      router.push('/');
    } else {
      setUserName(name);
    }
  }, []);

  return (
    <div className="dashboard-container">
    <NavBar />
      <section className="cards-section">
        <div className="card">
          <p>NIFTY 50</p>
          <h3>25,066.20</h3>
          <span className="red">▼ 0.10%</span>
          <div className="chart-placeholder red-line"></div>
        </div>

        <div className="card">
          <p>USD/INR</p>
          <h3>86.40</h3>
          <span className="green">▲ 0.07%</span>
          <div className="chart-placeholder green-line"></div>
        </div>

        <div className="card">
          <p>Gold</p>
          <h3>10,321.67</h3>
          <span className="gray">● 0.00%</span>
          <div className="chart-placeholder gray-line"></div>
        </div>
      </section>
    </div>
  );
}
