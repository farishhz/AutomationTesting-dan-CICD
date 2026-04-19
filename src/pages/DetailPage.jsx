import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import {
  asyncReceiveThreadDetail,
  asyncToggleUpvoteDetail,
  asyncAddComment,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../states/threadDetail/reducer';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import { postedAt } from '../utils';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpvoteToggle = () => {
    dispatch(asyncToggleUpvoteDetail());
  };

  const onAddComment = (content) => {
    if (!authUser) {
      alert('You must login first');
      return;
    }
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncToggleUpvoteComment(commentId));
  };

  const onDownvoteComment = (commentId) => {
    dispatch(asyncToggleDownvoteComment(commentId));
  };

  if (!threadDetail) {
    return null;
  }

  const isUpvoted = authUser && threadDetail.upVotesBy.includes(authUser.id);
  const isDownvoted = authUser && threadDetail.downVotesBy.includes(authUser.id);

  return (
    <div className="detail-page pb-20">
      <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={20} />
        Back to threads
      </Link>

      <article className="glass-card p-10 mb-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className="avatar-md" />
            <div>
              <p className="font-bold text-lg">{threadDetail.owner.name}</p>
              <p className="text-sm text-text-muted">{postedAt(threadDetail.createdAt)}</p>
            </div>
          </div>
          <div className="category-tag">
            #
            {threadDetail.category}
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-6 leading-tight">{threadDetail.title}</h1>
        <div className="body-content text-lg leading-relaxed text-text mb-10" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />

        <div className="flex items-center gap-6 pt-6 border-t border-glass-border">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`vote-btn big-btn ${isUpvoted ? 'active-up' : ''}`}
              onClick={onUpvoteToggle}
            >
              <ThumbsUp size={24} />
            </button>
            <span className="text-lg font-bold">{threadDetail.upVotesBy.length}</span>

            <button
              type="button"
              className={`vote-btn big-btn ${isDownvoted ? 'active-down' : ''}`}
              // Neutral logic handled in reducer
            >
              <ThumbsDown size={24} />
            </button>
            <span className="text-lg font-bold">{threadDetail.downVotesBy.length}</span>
          </div>
        </div>
      </article>

      <div className="comments-section glass-card p-10">
        <h3 className="text-2xl font-bold mb-8">
          Comments (
          {threadDetail.comments.length}
          )
        </h3>

        {authUser ? (
          <CommentInput addComment={onAddComment} />
        ) : (
          <div className="p-6 bg-glass rounded-lg text-center mb-8 border border-dashed border-glass-border">
            <p>
              Please
              <Link to="/login" className="text-primary font-bold">login</Link>
              {' '}
              to join the discussion.
            </p>
          </div>
        )}

        <div className="comment-list">
          {threadDetail.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              authId={authUser?.id}
              upvote={onUpvoteComment}
              downvote={onDownvoteComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
