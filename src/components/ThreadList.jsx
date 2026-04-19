import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads, users, authId, upvote, downvote,
}) {
  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          user={users.find((u) => u.id === thread.ownerId)}
          authId={authId}
          upvote={upvote}
          downvote={downvote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  authId: PropTypes.string,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default ThreadList;
