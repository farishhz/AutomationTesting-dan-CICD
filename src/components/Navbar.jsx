import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, Trophy, PlusCircle, LogIn, LogOut,
} from 'lucide-react';

function Navbar({ authUser, signOut }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar glass-card">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-gradient logo text-2xl">ForumApp</Link>
        <div className="nav-links flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Home size={20} />
            <span className="hide-mobile">Home</span>
          </Link>
          <Link to="/leaderboards" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Trophy size={20} />
            <span className="hide-mobile">Leaderboards</span>
          </Link>
          {authUser && (
            <Link to="/add-thread" className="flex items-center gap-2 hover:text-primary transition-colors">
              <PlusCircle size={20} />
              <span className="hide-mobile">New Thread</span>
            </Link>
          )}
        </div>
        <div className="nav-user flex items-center gap-4">
          {authUser ? (
            <div className="flex items-center gap-3">
              <div className="user-profile flex items-center gap-2">
                <img src={authUser.avatar} alt={authUser.name} className="avatar-sm" />
                <span className="hide-mobile font-medium">{authUser.name}</span>
              </div>
              <button type="button" onClick={signOut} className="btn-icon hover:text-error" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => navigate('/login')} className="btn btn-primary">
              <LogIn size={20} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  authUser: PropTypes.object,
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
