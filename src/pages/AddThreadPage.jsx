import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/reducer';

function AddThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = (e) => {
    e.preventDefault();
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <div className="add-thread-page max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-extrabold mb-8 text-gradient">Create New Thread</h2>

      <div className="glass-card p-10">
        <form onSubmit={onCreateThread}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What is the title of your discussion?"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="category">Category (optional)</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. react, general, help"
            />
          </div>
          <div className="input-group">
            <label htmlFor="body">Discussion Content</label>
            <textarea
              rows="10"
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell us more about it..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full justify-center py-3 mt-4">
            Create Discussion
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddThreadPage;
