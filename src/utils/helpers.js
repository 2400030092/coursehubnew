import { clsx } from 'clsx';

export const cn = (...inputs) => {
  return clsx(inputs);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

export const getProgressColor = (progress) => {
  if (progress >= 80) return 'text-green-600';
  if (progress >= 60) return 'text-yellow-600';
  if (progress >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const getProgressBgColor = (progress) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 60) return 'bg-yellow-500';
  if (progress >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const getCourseLevelColor = (level) => {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800';
    case 'draft':
      return 'bg-yellow-100 text-yellow-800';
    case 'archived':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Pricing helpers
// Generate a random price under a maximum with an optional minimum, rounded to .99 for consistency
export const randomPriceUnder = (max = 499, min = 19.99) => {
  const lo = Math.max(0, Math.min(min, max));
  const hi = Math.max(lo, max);
  const base = Math.random() * (hi - lo) + lo; // [lo, hi)
  // Round down to nearest whole and add .99 to create typical price formatting
  const dollars = Math.max(0, Math.floor(base));
  return Math.min(hi, Math.max(lo, Number((dollars + 0.99).toFixed(2))));
};

export const formatTo99 = (price) => {
  if (typeof price !== 'number' || isNaN(price)) return 0;
  const dollars = Math.max(0, Math.floor(price));
  return Number((dollars + 0.99).toFixed(2));
};

// If price exceeds the max, replace with a random value under max. Negative becomes 0.
export const sanitizeCoursePrice = (price, max = 499) => {
  if (typeof price !== 'number' || isNaN(price)) return 0;
  if (price < 0) return 0;
  if (price > max) return randomPriceUnder(max);
  return Number(price.toFixed(2));
};
