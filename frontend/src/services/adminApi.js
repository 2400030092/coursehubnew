const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const parseError = async (response, fallbackMessage) => {
  try {
    const data = await response.json();
    return data.message || data.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

export const fetchAdminUsers = async (adminId) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/users?adminId=${adminId}`);

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to fetch users'));
  }

  return response.json();
};

export const fetchAdminCourses = async (adminId) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/courses?adminId=${adminId}`);

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to fetch courses'));
  }

  return response.json();
};

export const deleteAdminUser = async (adminId, userId) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}?adminId=${adminId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to delete user'));
  }
};

export const deleteAdminCourse = async (adminId, courseId) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/courses/${courseId}?adminId=${adminId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to delete course'));
  }
};

export const updateAdminCourseStatus = async (adminId, courseId, status) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/courses/${courseId}/status?adminId=${adminId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to update course status'));
  }

  return response.json();
};
