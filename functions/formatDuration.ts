const getTimeSince = (createdAt: string | Date | undefined) => {
  if (!createdAt) return "Member since: Unknown";

  const createdDate = new Date(createdAt);
  if (isNaN(createdDate.getTime())) return "Member since: Invalid Date";

  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
  if (years > 0) return `Member since: ${years} years ago`;

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  if (days > 0) return `Member since: ${days} days ago`;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  if (hours > 0) return `Member since: ${hours} hours ago`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 0) return `Member since: ${minutes} minutes ago`;

  return `Member since: ${diffInSeconds} seconds ago`;
};

export { getTimeSince };
