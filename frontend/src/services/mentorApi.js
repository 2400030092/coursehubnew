const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const fetchMentors = async () => {
  const response = await fetch(`${API_BASE_URL}/api/mentors`);

  if (!response.ok) {
    throw new Error('Failed to fetch mentors');
  }

  return response.json();
};
