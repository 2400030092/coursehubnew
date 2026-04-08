import { getCourseById as getMockCourseById, getCourses as getMockCourses } from '../utils/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const normalizeLesson = (lesson) => ({
  id: lesson.id,
  title: lesson.title,
  type: lesson.type,
  duration: lesson.duration ?? lesson.durationInSeconds ?? 0,
  orderIndex: lesson.orderIndex,
  videoUrl: lesson.videoUrl
});

const normalizeModule = (module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  orderIndex: module.orderIndex,
  lessons: (module.lessons || []).map(normalizeLesson)
});

const normalizeCourse = (course) => ({
  id: course.id,
  courseId: course.courseId || course.id,
  title: course.title,
  description: course.description,
  category: course.category,
  level: course.level,
  status: course.status,
  price: course.price,
  thumbnail: course.thumbnail || course.thumbnailUrl || null,
  enrollmentCount: course.enrollmentCount ?? 0,
  instructorId: course.instructorId,
  firstName: course.firstName,
  lastName: course.lastName,
  instructorAvatar: course.instructorAvatar || null,
  createdAt: course.createdAt || null,
  progress: course.progress ?? 0,
  enrolledAt: course.enrolledAt || null,
  modules: (course.modules || []).map(normalizeModule)
});

const parseError = async (response, fallbackMessage) => {
  try {
    const data = await response.json();
    return data.message || data.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const toQueryString = (params) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });

  return query.toString();
};

export const fetchCourses = async (params = {}) => {
  try {
    const queryString = toQueryString({
      search: params.search,
      category: params.category,
      level: params.level
    });

    const response = await fetch(`${API_BASE_URL}/api/courses${queryString ? `?${queryString}` : ''}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }

    const data = await response.json();
    const normalized = data.map(normalizeCourse);
    const page = Number(params.page || 1);
    const limit = Number(params.limit || normalized.length || 10);
    const startIndex = (page - 1) * limit;

    return {
      courses: normalized.slice(startIndex, startIndex + limit),
      pagination: {
        page,
        limit,
        total: normalized.length,
        pages: Math.max(1, Math.ceil(normalized.length / limit))
      }
    };
  } catch (error) {
    console.warn('Falling back to mock course list:', error);
    return getMockCourses(params);
  }
};

export const fetchCourseById = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course ${courseId}: ${response.status}`);
    }

    const data = await response.json();
    return normalizeCourse(data);
  } catch (error) {
    console.warn(`Falling back to mock course ${courseId}:`, error);
    return getMockCourseById(courseId);
  }
};

export const fetchInstructorCourses = async (instructorId) => {
  const response = await fetch(`${API_BASE_URL}/api/courses/instructor/${instructorId}`);

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to fetch instructor courses'));
  }

  const data = await response.json();
  return data.map(normalizeCourse);
};

export const createCourse = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to create course'));
  }

  return normalizeCourse(await response.json());
};

export const deleteCourse = async (courseId, instructorId) => {
  const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}?instructorId=${instructorId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to delete course'));
  }
};

export const fetchStudentEnrollments = async (studentId) => {
  const response = await fetch(`${API_BASE_URL}/api/enrollments/student/${studentId}`);

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to fetch enrollments'));
  }

  const data = await response.json();
  return data.map(normalizeCourse);
};

export const createEnrollment = async ({ studentId, courseId }) => {
  const response = await fetch(`${API_BASE_URL}/api/enrollments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ studentId, courseId })
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Failed to create enrollment'));
  }

  const data = await response.json();
  return normalizeCourse(data);
};
