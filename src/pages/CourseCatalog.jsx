import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Clock, Users, BookOpen, ChevronRight, SlidersHorizontal, X, Play } from 'lucide-react';
import { getCourses } from '../utils/mockData';
import { Card, CardContent } from '../components/Card';
import { getCourseLevelColor } from '../utils/helpers';
import { SEO } from '../components/SEO';
import { SkeletonCard } from '../components/SkeletonLoader';

export const CourseCatalog = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    'Web Development', 'Data Science', 'Design', 'Business',
    'Marketing', 'Photography', 'Music', 'Language', 'Health', 'Other'
  ];

  const levels = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    fetchCourses();
  }, [currentPage, searchTerm, selectedCategory, selectedLevel]);

  const fetchCourses = () => {
    setLoading(true);
    const params = {
      page: currentPage,
      limit: 12,
      ...(searchTerm && { search: searchTerm }),
      ...(selectedCategory && { category: selectedCategory }),
      ...(selectedLevel && { level: selectedLevel })
    };

    const response = getCourses(params);
    setCourses(response.courses);
    setTotalPages(response.pagination.pages);
    setLoading(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLevel('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title="Course Catalog - Browse All Courses"
        description="Explore thousands of high-quality courses in web development, data science, design, business, and more. Find the perfect course to advance your career."
        keywords="course catalog, online courses, web development, data science, design, business courses"
      />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 dark:from-primary-950 dark:via-primary-900 dark:to-secondary-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-secondary-200">Course Library</span>
            </h1>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Discover thousands of high-quality courses from expert instructors.
              Advance your career and learn new skills at your own pace.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-500/30 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-gray-700 w-full justify-center"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-72 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
                {(selectedCategory || selectedLevel) && (
                  <button onClick={clearFilters} className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    Reset All
                  </button>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategory === category ? 'bg-primary-600 border-primary-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-400'}`}>
                          {selectedCategory === category && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          name="category"
                          className="hidden"
                          checked={selectedCategory === category}
                          onChange={() => { setSelectedCategory(category === selectedCategory ? '' : category); setCurrentPage(1); }}
                        />
                        <span className={`text-sm ${selectedCategory === category ? 'text-primary-700 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Level</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedLevel === level ? 'bg-primary-600 border-primary-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-400'}`}>
                          {selectedLevel === level && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          name="level"
                          className="hidden"
                          checked={selectedLevel === level}
                          onChange={() => { setSelectedLevel(level === selectedLevel ? '' : level); setCurrentPage(1); }}
                        />
                        <span className={`text-sm capitalize ${selectedLevel === level ? 'text-primary-700 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : courses.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">Showing <span className="font-semibold text-gray-900">{courses.length}</span> courses</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Sort by:</span>
                    <select className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer">
                      <option>Most Popular</option>
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card
                      key={course.id}
                      className="group border-0 shadow-md dark:shadow-lg hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/30 transition-all duration-500 overflow-hidden rounded-2xl bg-white dark:bg-gray-800 h-full flex flex-col cursor-pointer transform hover:-translate-y-1"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-900">
                        {/* Image with better fallback */}
                        <img
                          src={course.thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80`}
                          alt={course.title}
                          className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          onError={(e) => {
                            if (e.target.src.includes('unsplash')) {
                              e.target.src = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80`;
                            } else {
                              e.target.style.display = 'none';
                            }
                          }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/70 transition-all duration-300" />

                        {/* Level Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className={`px-3 py-1.5 text-xs font-bold rounded-lg backdrop-blur-md shadow-lg uppercase tracking-wide ${course.level === 'beginner'
                            ? 'bg-green-500/90 text-white'
                            : course.level === 'intermediate'
                              ? 'bg-blue-500/90 text-white'
                              : 'bg-purple-500/90 text-white'
                            }`}>
                            {course.level}
                          </span>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-3 py-1.5 text-sm font-bold rounded-lg bg-primary-600 text-white shadow-lg backdrop-blur-sm">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                          </span>
                        </div>

                        {/* Hover overlay with quick view */}
                        <div className="absolute inset-0 bg-primary-600/90 dark:bg-primary-700/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                          <span className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Course →
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        {/* Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-900/30">
                            <BookOpen className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                            {course.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                          {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-5 flex-1 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">4.8</span>
                          <span className="text-xs text-gray-500 dark:text-gray-500 ml-1">(128)</span>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={course.instructorAvatar || `https://ui-avatars.com/api/?name=${course.firstName}+${course.lastName}&background=6366f1&color=fff&size=128&bold=true`}
                                alt={course.firstName}
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-sm object-cover"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${course.firstName}+${course.lastName}&background=6366f1&color=fff&size=128&bold=true`;
                                }}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {course.firstName} {course.lastName}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>

                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-full font-medium transition-all ${currentPage === i + 1
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  We couldn't find any courses matching your criteria. Try adjusting your filters or search term.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
