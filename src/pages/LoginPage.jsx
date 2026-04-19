import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/reducer';

import LoginInput from '../components/LoginInput';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="login-page flex items-center justify-center pt-20">
      <div className="glass-card p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-2 text-gradient">Welcome Back</h2>
        <p className="text-text-muted mb-8">Login to join the conversation.</p>

        <LoginInput login={onLogin} />

        <p className="mt-8 text-center text-text-muted">
          Don&apos;t have an account?
          {' '}
          <Link to="/register" className="text-primary font-bold hover:underline">Sign up for free</Link>
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

export default LoginPage;
