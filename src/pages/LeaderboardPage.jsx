import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/reducer';

function LeaderboardPage() {
  const { leaderboards = [] } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard-page max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-extrabold mb-8 text-gradient">Leaderboards</h2>

      <div className="glass-card overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-glass border-b border-glass-border">
          <span className="font-bold">User</span>
          <span className="font-bold">Score</span>
        </div>

        <div className="leaderboard-list">
          {leaderboards.map((item) => (
            <div key={item.user.id} className="flex justify-between items-center p-6 hover:bg-glass transition-colors">
              <div className="flex items-center gap-4">
                <img src={item.user.avatar} alt={item.user.name} className="avatar-md" />
                <span className="text-lg font-medium">{item.user.name}</span>
              </div>
              <span className="text-2xl font-black text-primary">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
        .leaderboard-page { margin-left: auto; margin-right: auto; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
      `}
      </style>
    </div>
  );
}

export default LeaderboardPage;
