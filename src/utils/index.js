function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;

  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInSeconds = Math.floor(diff / 1000);

  if (diffInDays > 0) {
    return `${diffInDays} days ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours} hours ago`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes} minutes ago`;
  }
  if (diffInSeconds > 0) {
    return `${diffInSeconds} seconds ago`;
  }
  return 'just now';
}

export { postedAt };
