'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../styles/AuthForm.css';

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  // Validation
  if (!email || !password) {
    setError('Email and password are required');
    return;
  }

  if (!isLogin) {
    if (!name || !mobile || !age || !confirmPassword) {
      setError('All fields are required for signup');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }
  }

  // URL based on mode
  const endpoint = isLogin
    ? 'https://paradox-point-1.onrender.com/login'
    : 'https://paradox-point-1.onrender.com/register';

  const payload = isLogin
    ? { email, password }
    : {
        name,
        email,
        password,
        confirm_password: confirmPassword,
        mobile_number: mobile,
        age: parseInt(age),
      };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

if (!response.ok) {
  throw new Error(data.detail || 'Something went wrong');
}

setSuccess(data.message);
const fetchUser = async (email: string) => {
  try {
    const res = await fetch(`https://paradox-point-1.onrender.com/user/${email}`);
    const userData = await res.json();
    localStorage.setItem("name", userData.name);
    localStorage.setItem("email", userData.email);
    router.push("/dashboard");
  } catch (err) {
    console.error("Failed to fetch user data:", err);
  }
};


if (isLogin) {
  await fetchUser(email); 
} else {
  setName('');
  setEmail('');
  setPassword('');
  setConfirmPassword('');
  setMobile('');
  setAge('');
}

  } catch (err: any) {
    setError(err.message);
  }
};

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="title">Login Form</h2>

        <div className="toggle-wrapper">
          <div className={`slider ${isLogin ? 'left' : 'right'}`}></div>
          <button className={`toggle-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)} type="button">
            Login
          </button>
          <button className={`toggle-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)} type="button">
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
              <input type="text" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} required />
              <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
            </>
          )}

          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {!isLogin && (
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          )}

          {isLogin && (
            <div className="forgot">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p className="switch">
          {isLogin ? (
            <>
              Not a member? <span onClick={() => setIsLogin(false)}>Signup now</span>
            </>
          ) : (
            <>
              Already a member? <span onClick={() => setIsLogin(true)}>Login now</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
    