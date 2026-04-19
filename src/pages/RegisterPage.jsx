import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/reducer';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch {
      // Error handling is managed by the asyncRegisterUser thunk
    }
  };

  return (
    <div className="login-page flex items-center justify-center pt-20">
      <div className="glass-card p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-2 text-gradient">Create Account</h2>
        <p className="text-text-muted mb-8">Join the community today.</p>

        <form onSubmit={onRegister}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full justify-center py-3 mt-4">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-text-muted">
          Already have an account?
          {' '}
          <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      </div>
      <style>
        {`
        .pt-20 { padding-top: 5rem; }
        .p-10 { padding: 2.5rem; }
        .w-full { width: 100%; }
        .max-w-md { max-width: 28rem; }
      `}
      </style>
    </div>
  );
}

export default RegisterPage;
