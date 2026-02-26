import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Users, Trash2 } from 'lucide-react';
import { getMyCourses } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { getStatusColor, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import { SEO } from '../components/SEO';
import { SkeletonCard } from '../components/SkeletonLoader';

export const CourseManagement = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);
    const response = getMyCourses(user.id);
    setCourses(response.courses);
    setLoading(false);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
      toast.success('Course deleted successfully');
    }
  };

  return (
    <div className="p-6">
      <SEO
        title="Course Management"
        description="Manage and organize your courses as an instructor"
        keywords="course management, instructor, courses, teaching"
      />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Manage and organize your courses</p>
        </div>
        <Link to="/instructor/courses/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Course Image</span>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.enrollmentCount} students
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Created {formatDate(course.createdAt)}</span>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/courses/${course.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/instructor/courses/${course.id}/edit`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Link to={`/instructor/courses/${course.id}/students`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Users className="h-4 w-4 mr-1" />
                        Students
                      </Button>
                    </Link>
                    <Link to={`/instructor/courses/${course.id}/assignments`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Assignments
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-6">Create your first course to get started</p>
          <Link to="/instructor/courses/create">
            <Button>Create Your First Course</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
