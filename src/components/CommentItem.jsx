import React from 'react';
import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { postedAt } from '../utils';

function CommentItem({
  id, content, createdAt, owner, upVotesBy, downVotesBy, authId, upvote, downvote,
}) {
  const isUpvoted = upVotesBy.includes(authId);
  const isDownvoted = downVotesBy.includes(authId);

  return (
    <div className="comment-item py-6 border-b border-surface-border last:border-0">
      <div className="flex items-center gap-3 mb-3">
        <img src={owner.avatar} alt={owner.name} className="avatar-sm" />
        <div>
          <p className="font-bold">{owner.name}</p>
          <p className="text-xs text-text-muted">{postedAt(createdAt)}</p>
        </div>
      </div>
      <div className="comment-text text-text mb-4" dangerouslySetInnerHTML={{ __html: content }} />

      <div className="flex items-center gap-4 ml-11">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`vote-btn sm-btn ${isUpvoted ? 'active-up' : ''}`}
            onClick={() => upvote(id)}
          >
            <ThumbsUp size={16} />
          </button>
          <span className="text-sm">{upVotesBy.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`vote-btn sm-btn ${isDownvoted ? 'active-down' : ''}`}
            onClick={() => downvote(id)}
          >
            <ThumbsDown size={16} />
          </button>
          <span className="text-sm">{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  authId: PropTypes.string,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default CommentItem;
