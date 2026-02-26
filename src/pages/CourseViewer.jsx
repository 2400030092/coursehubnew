import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { getCourseById } from '../utils/mockData';
import { useProgress } from '../contexts/ProgressContext';
import toast from 'react-hot-toast';
import { SEO } from '../components/SEO';

export const CourseViewer = () => {
  const { id } = useParams();
  const courseId = parseInt(id);
  const { markVideoCompleted, getCourseProgress, isVideoCompleted, isModuleCompleted } = useProgress();

  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const autoCompletedRef = useRef(false);
  // When we auto-load the next video using the existing player, set this to
  // skip the recreate/destroy cycle in the player-effect to allow seamless playback.
  const skipPlayerRecreateRef = useRef(false);
  const [moduleRatings, setModuleRatings] = useState({});

  useEffect(() => {
    const courseData = getCourseById(courseId);
    setCourse(courseData);
    // load saved ratings for this course
    try {
      const raw = localStorage.getItem(`coursehub:feedback:${courseId}`);
      if (raw) setModuleRatings(JSON.parse(raw));
    } catch (e) { void e; }
  }, [courseId]);

  const progress = getCourseProgress(courseId);

  // Safely compute current module/lesson even when course is not yet loaded
  const modules = course?.modules || [];
  const currentModuleData = modules[currentModule] || { id: undefined, title: '', lessons: [] };
  const currentLessonData = currentModuleData?.lessons?.[currentLesson];

  // Find the first uncompleted lesson across all modules
  const findFirstUncompleted = () => {
    for (let m = 0; m < modules.length; m++) {
      const lessons = modules[m]?.lessons || [];
      for (let l = 0; l < lessons.length; l++) {
        if (!isVideoCompleted(courseId, modules[m].id, lessons[l].id)) {
          return { moduleIndex: m, lessonIndex: l };
        }
      }
    }
    return null;
  };

  // Find the next uncompleted lesson after the current one
  const findNextUncompleted = () => {
    // start from current position + 1
    for (let m = currentModule; m < modules.length; m++) {
      const startLesson = m === currentModule ? currentLesson + 1 : 0;
      const lessons = modules[m]?.lessons || [];
      for (let l = startLesson; l < lessons.length; l++) {
        if (!isVideoCompleted(courseId, modules[m].id, lessons[l].id)) {
          return { moduleIndex: m, lessonIndex: l };
        }
      }
    }
    return null;
  };

  // On course load, jump to first uncompleted lesson
  useEffect(() => {
    if (!course || modules.length === 0) return;
    const target = findFirstUncompleted();
    if (target) {
      setCurrentModule(target.moduleIndex);
      setCurrentLesson(target.lessonIndex);
      setExpandedModuleIndex(target.moduleIndex);
    } else {
      // default to first lesson if everything is completed
      setCurrentModule(0);
      setCurrentLesson(0);
      setExpandedModuleIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, course]);

  // Keep expanded panel in sync with the current module
  useEffect(() => {
    setExpandedModuleIndex(currentModule);
  }, [currentModule]);

  // Utility to extract YouTube ID from an embed URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    // handles https://www.youtube.com/embed/VIDEO_ID and other typical formats
    const match = url.match(/(?:embed\/|v=)([a-zA-Z0-9_-]{6,})/);
    return match ? match[1] : null;
  };

  // Load YouTube IFrame API once
  const loadYouTubeAPI = () => new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const existing = document.getElementById('youtube-iframe-api');
    if (!existing) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });

  // Initialize YT player when lesson changes
  useEffect(() => {
    // If we auto-loaded the next video using loadVideoById, skip destroying
    // and recreating the player to allow seamless playback.
    if (skipPlayerRecreateRef.current) {
      skipPlayerRecreateRef.current = false;
      setVideoEnded(false);
      autoCompletedRef.current = false;
      return;
    }

    setVideoEnded(false);
    autoCompletedRef.current = false;
    // Cleanup previous player
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch (e) { void e; }
      playerRef.current = null;
    }
    const videoId = getYouTubeId(currentLessonData?.videoUrl);
    if (!videoId || !playerContainerRef.current) return;
    let isMounted = true;
    loadYouTubeAPI().then((YT) => {
      if (!isMounted || !playerContainerRef.current) return;
      playerRef.current = new YT.Player(playerContainerRef.current, {
        videoId,
        playerVars: {
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          autoplay: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            try { playerRef.current?.playVideo(); } catch (e) { void e; }
          },
          onStateChange: (event) => {
            // 0 => ended
            if (event.data === 0) {
              setVideoEnded(true);
              // Auto-complete and advance if not already completed for this lesson
              if (!autoCompletedRef.current && currentLessonData && currentModuleData) {
                autoCompletedRef.current = true;
                const already = isVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);
                if (!already) {
                  markVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);
                  toast.success('Video completed! 🎉');
                  const updatedProgress = getCourseProgress(courseId);
                  if (updatedProgress.courseCompleted && !showCongratulations) {
                    setShowCongratulations(true);
                    toast.success('🎊 Congratulations! You have completed this course! 🎊', {
                      duration: 6000,
                      style: { background: '#10B981', color: '#fff', fontSize: '16px', fontWeight: 'bold' },
                    });
                    return;
                  }
                  const next = findNextUncompleted();
                  if (next) {
                    // Try seamless playback using the existing player's loadVideoById
                    const nextVideoUrl = modules?.[next.moduleIndex]?.lessons?.[next.lessonIndex]?.videoUrl;
                    const nextVideoId = getYouTubeId(nextVideoUrl);
                    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function' && nextVideoId) {
                      try {
                        skipPlayerRecreateRef.current = true;
                        playerRef.current.loadVideoById(nextVideoId);
                        setCurrentModule(next.moduleIndex);
                        setCurrentLesson(next.lessonIndex);
                        setVideoEnded(false);
                        toast('Auto-advancing to the next lesson ▶️', { duration: 2000 });
                        return;
                      } catch (e) {
                        void e;
                      }
                    }

                    // fallback: update state and allow effect to recreate the player
                    setCurrentModule(next.moduleIndex);
                    setCurrentLesson(next.lessonIndex);
                    setVideoEnded(false);
                    toast('Auto-advancing to the next lesson ▶️', { duration: 2000 });
                  }
                }
              }
            }
          },
        },
      });
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLessonData?.videoUrl]);

  const handleVideoComplete = () => {
    if (!currentLessonData) return;

    const wasCompleted = isVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);

    if (!wasCompleted) {
      markVideoCompleted(courseId, currentModuleData.id, currentLessonData.id);
      toast.success('Video completed! 🎉');

      // Check if this completion finished the course
      const updatedProgress = getCourseProgress(courseId);
      if (updatedProgress.courseCompleted && !showCongratulations) {
        setShowCongratulations(true);
        toast.success('🎊 Congratulations! You have completed this course! 🎊', {
          duration: 6000,
          style: {
            background: '#10B981',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
        return; // do not auto-advance past completion
      }

      // Auto-advance to the next uncompleted lesson and autoplay
      const next = findNextUncompleted();
      if (next) {
        setCurrentModule(next.moduleIndex);
        setCurrentLesson(next.lessonIndex);
        setVideoEnded(false);
        toast('Auto-advancing to the next lesson ▶️', { duration: 2000 });
      }
    }
  };

  const navigateToLesson = (moduleIndex, lessonIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(lessonIndex);
  };

  const saveModuleRating = (moduleId, rating) => {
    setModuleRatings((prev) => {
      const next = { ...prev, [moduleId]: rating };
      try {
        localStorage.setItem(`coursehub:feedback:${courseId}`, JSON.stringify(next));
      } catch (e) { void e; }
      return next;
    });
    toast.success('Thanks for your feedback!');
  };

  const nextLesson = () => {
    const nextLessonIndex = currentLesson + 1;
    if (nextLessonIndex < currentModuleData.lessons.length) {
      setCurrentLesson(nextLessonIndex);
    } else {
      const nextModuleIndex = currentModule + 1;
      if (nextModuleIndex < course.modules.length) {
        setCurrentModule(nextModuleIndex);
        setCurrentLesson(0);
      }
    }
  };

  const previousLesson = () => {
    const prevLessonIndex = currentLesson - 1;
    if (prevLessonIndex >= 0) {
      setCurrentLesson(prevLessonIndex);
    } else {
      const prevModuleIndex = currentModule - 1;
      if (prevModuleIndex >= 0) {
        setCurrentModule(prevModuleIndex);
        setCurrentLesson(course.modules[prevModuleIndex].lessons.length - 1);
      }
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title={course ? `${course.title} - Learning` : 'Course Viewer'}
        description={course ? `Learn ${course.title} with expert instruction` : 'View and learn from course content'}
        keywords={course ? `${course.title}, ${course.category}, learning, online course` : 'course viewer, learning'}
      />
      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{course?.title || 'Loading course...'}</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {progress.completedVideos} of {progress.totalVideos} videos completed
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Progress: {progress.percentage}% • Modules completed: {progress.completedModules}/{progress.totalModules}
          </div>
          {progress.courseCompleted && (
            <div className="mt-2 text-sm font-semibold text-green-600">
              🎊 Course Completed! Congratulations! 🎊
            </div>
          )}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Course Content */}
          <div className="lg:col-span-9">
            <Card>
              <CardContent className="p-0">
                {/* Video Player */}
                <div className="h-[45vh] md:h-[55vh] bg-black rounded-t-lg overflow-hidden">
                  {currentLessonData?.videoUrl ? (
                    <div ref={playerContainerRef} className="w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <p>{course ? 'Video not available' : 'Loading...'}</p>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentLessonData?.title || (course ? 'Select a lesson' : 'Loading...')}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course && currentModuleData
                          ? `Module ${currentModule + 1}: ${currentModuleData?.title} • ${formatDuration(currentLessonData?.duration || 0)}`
                          : ''}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isVideoCompleted(courseId, currentModuleData?.id, currentLessonData?.id) && (
                        <span className="text-green-600 text-sm font-medium">✓ Completed</span>
                      )}
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        onClick={previousLesson}
                        disabled={!course || (currentModule === 0 && currentLesson === 0)}
                        variant="outline"
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={handleVideoComplete}
                        disabled={!course}
                        className={`bg-green-600 hover:bg-green-700 ${!course ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isVideoCompleted(courseId, currentModuleData?.id, currentLessonData?.id)
                          ? 'Completed'
                          : 'Mark as Complete'}
                      </Button>
                      <Button
                        onClick={nextLesson}
                        disabled={
                          !course || (
                            currentModule === modules.length - 1 &&
                            currentLesson === (currentModuleData?.lessons?.length || 0) - 1
                          )
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Course Sidebar */}
          <div className="lg:col-span-3 ">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Content</h3>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[90vh] overflow-y-auto">
                  {(modules).map((module, moduleIndex) => (
                    <div key={module.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 w-full">
                      <button
                        type="button"
                        onClick={() => {
                          // expand this module and play the first lesson
                          setExpandedModuleIndex(moduleIndex);
                          setCurrentModule(moduleIndex);
                          setCurrentLesson(0);
                        }}
                        className="w-full text-left p-4 mb-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Module {moduleIndex + 1}: {module.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {module.lessons.filter(les => isVideoCompleted(courseId, module.id, les.id)).length}
                              /{module.lessons.length} completed
                            </p>
                          </div>
                          {isModuleCompleted(courseId, module.id) && (
                            <span className="text-green-600 text-sm">✓</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {module.lessons.length} videos
                        </p>
                      </button>
                      {expandedModuleIndex === moduleIndex && (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${currentModule === moduleIndex && currentLesson === lessonIndex
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-600'
                              : ''
                              }`}>
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => navigateToLesson(moduleIndex, lessonIndex)}
                                  className="text-left"
                                >
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatDuration(lesson.duration)}
                                    </p>
                                  </div>
                                </button>
                                <div className="flex items-center">
                                  {isVideoCompleted(courseId, module.id, lesson.id) && (
                                    <span className="text-green-600 text-sm">✓</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* Module feedback: simple 1-5 star rating persisted to localStorage */}
                          <div className="p-4 bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Rate this module</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Share feedback to help improve the course</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => {
                                  const star = i + 1;
                                  const current = moduleRatings[module.id] || 0;
                                  return (
                                    <button
                                      key={star}
                                      type="button"
                                      aria-label={`${star} star`}
                                      onClick={() => saveModuleRating(module.id, star)}
                                      className={`text-2xl leading-none focus:outline-none ${current >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                                    >
                                      {current >= star ? '★' : '☆'}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                            {moduleRatings[module.id] && (
                              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Your rating: {moduleRatings[module.id]} / 5</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
