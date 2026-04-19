import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AddThreadPage from './pages/AddThreadPage';
import { asyncPreloadProcess } from './states/isPreload/reducer';
import { asyncUnsetAuthUser } from './states/authUser/reducer';

function App() {
  const { authUser, isPreload } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          <Navbar authUser={authUser} signOut={onSignOut} />
        </header>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/add-thread" element={authUser ? <AddThreadPage /> : <LoginPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
