import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  const onComment = (e) => {
    e.preventDefault();
    addComment(content);
    setContent('');
  };

  return (
    <div className="comment-input mt-8 mb-10">
      <h4 className="text-lg font-bold mb-4">Leave a comment</h4>
      <form onSubmit={onComment}>
        <div className="input-group">
          <textarea
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are your thoughts?"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Post Comment</button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
