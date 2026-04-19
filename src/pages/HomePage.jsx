import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleUpvoteThread, asyncToggleDownvoteThread } from '../states/threads/reducer';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const { threads = [], users = [], authUser } = useSelector((state) => state);
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpvote = (id) => {
    dispatch(asyncToggleUpvoteThread(id));
  };

  const onDownvote = (id) => {
    dispatch(asyncToggleDownvoteThread(id));
  };

  const categories = [...new Set(threads.map((t) => t.category))];

  const filteredThreads = threads.filter((t) => t.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="home-page">
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          className={`filter-tag ${filter === '' ? 'active' : ''}`}
          onClick={() => setFilter('')}
        >
          #all
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-tag ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            #
            {category}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Available Threads</h2>

      {filteredThreads.length > 0 ? (
        <ThreadList
          threads={filteredThreads}
          users={users}
          authId={authUser?.id}
          upvote={onUpvote}
          downvote={onDownvote}
        />
      ) : (
        <div className="glass-card p-10 text-center">
          <p className="text-text-muted">No threads found in this category.</p>
        </div>
      )}

      <style>
        {`
        .filter-tag { padding: 6px 16px; border-radius: 20px; background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-muted); transition: all 0.2s; }
        .filter-tag:hover { border-color: var(--primary); color: var(--text); }
        .filter-tag.active { background: var(--primary); color: white; border-color: var(--primary); }
        .flex-wrap { flex-wrap: wrap; }
      `}
      </style>
    </div>
  );
}

export default HomePage;
