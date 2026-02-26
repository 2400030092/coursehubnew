/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { getCourseById } from '../utils/mockData';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Store progress data in localStorage for persistence
  const [progressData, setProgressData] = useState(() => {
    try {
      const saved = localStorage.getItem('courseProgress');
      return saved ? JSON.parse(saved) : {};
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse courseProgress', err);
      return {};
    }
  });

  // Save to localStorage whenever progressData changes
  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(progressData));
  }, [progressData]);

  // Mark a video as completed
  const markVideoCompleted = (courseId, moduleId, lessonId) => {
    setProgressData(prev => {
      const prevCourseProgress = prev[courseId] || { completedVideos: [], completedModules: [], courseCompleted: false };
      const videoKey = `${moduleId}-${lessonId}`;

      // Create shallow copies to avoid mutating prev state
      const nextCompletedVideos = prevCourseProgress.completedVideos.includes(videoKey)
        ? prevCourseProgress.completedVideos
        : [...prevCourseProgress.completedVideos, videoKey];

      const course = getCourseById(courseId);
      const modules = course?.modules || [];

      // Recompute completedModules from completedVideos
      const nextCompletedModules = modules
        .filter(m => {
          const moduleVideoKeys = (m.lessons || []).map(lesson => `${m.id}-${lesson.id}`);
          return moduleVideoKeys.length > 0 && moduleVideoKeys.every(k => nextCompletedVideos.includes(k));
        })
        .map(m => m.id);

      const totalModules = modules.length;
      const courseCompleted = totalModules > 0 && nextCompletedModules.length === totalModules;

      const nextCourseProgress = {
        completedVideos: nextCompletedVideos,
        completedModules: nextCompletedModules,
        courseCompleted
      };

      return {
        ...prev,
        [courseId]: nextCourseProgress
      };
    });
  };

  // Get progress for a specific course
  const getCourseProgress = (courseId) => {
    const course = getCourseById(courseId);
    const progress = progressData[courseId] || { completedVideos: [], completedModules: [], courseCompleted: false };
    
    if (!course) return { percentage: 0, completedVideos: 0, totalVideos: 0, ...progress };

    const totalVideos = course.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedVideos = progress.completedVideos.length;
    const percentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

    return {
      percentage,
      completedVideos,
      totalVideos,
      completedModules: progress.completedModules.length,
      totalModules: course.modules.length,
      courseCompleted: progress.courseCompleted,
      ...progress
    };
  };

  // Check if a specific video is completed
  const isVideoCompleted = (courseId, moduleId, lessonId) => {
    const progress = progressData[courseId];
    if (!progress) return false;
    return progress.completedVideos.includes(`${moduleId}-${lessonId}`);
  };

  // Check if a specific module is completed
  const isModuleCompleted = (courseId, moduleId) => {
    const progress = progressData[courseId];
    if (!progress) return false;
    return progress.completedModules.includes(moduleId);
  };

  // Reset course progress (for testing purposes)
  const resetCourseProgress = (courseId) => {
    setProgressData(prev => {
      const newData = { ...prev };
      delete newData[courseId];
      return newData;
    });
  };

  const value = {
    markVideoCompleted,
    getCourseProgress,
    isVideoCompleted,
    isModuleCompleted,
    resetCourseProgress,
    progressData
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
