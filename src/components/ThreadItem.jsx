import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { postedAt } from '../utils';

function ThreadItem({
  id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, user, authId, upvote, downvote,
}) {
  const isUpvoted = upVotesBy.includes(authId);
  const isDownvoted = downVotesBy.includes(authId);

  return (
    <div className="thread-item glass-card p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="avatar-md" />
          <div>
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-sm text-text-muted">{postedAt(createdAt)}</p>
          </div>
        </div>
        <div className="category-tag">
          #
          {category}
        </div>
      </div>

      <Link to={`/threads/${id}`} className="block group">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text-muted line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: body }} />
      </Link>

      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`vote-btn ${isUpvoted ? 'active-up' : ''}`}
            onClick={() => upvote(id)}
          >
            <ThumbsUp size={18} />
          </button>
          <span className="text-sm font-medium">{upVotesBy.length}</span>

          <button
            type="button"
            className={`vote-btn ${isDownvoted ? 'active-down' : ''}`}
            onClick={() => downvote(id)}
          >
            <ThumbsDown size={18} />
          </button>
          <span className="text-sm font-medium">{downVotesBy.length}</span>
        </div>

        <div className="flex items-center gap-2 text-text-muted">
          <MessageSquare size={18} />
          <span className="text-sm font-medium">
            {totalComments}
            {' '}
            Comments
          </span>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  authId: PropTypes.string,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default ThreadItem;
