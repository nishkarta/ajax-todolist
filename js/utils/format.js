export const capitalizeFirstLetter = (string) => {
  if (string.length === 0) {
    return string; // Handle empty strings
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
};