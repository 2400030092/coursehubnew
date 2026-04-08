import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import { deleteAdminCourse, deleteAdminUser, fetchAdminCourses, fetchAdminUsers, updateAdminCourseStatus } from '../services/adminApi';
import { formatDate, getStatusColor } from '../utils/helpers';

export const AdminManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseSearch, setCourseSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingCourseId, setUpdatingCourseId] = useState(null);

  useEffect(() => {
    const loadAdminData = async () => {
      if (!user?.id) {
        return;
      }

      setLoading(true);
      try {
        const [loadedUsers, loadedCourses] = await Promise.all([
          fetchAdminUsers(user.id),
          fetchAdminCourses(user.id)
        ]);
        setUsers(loadedUsers);
        setCourses(loadedCourses);
      } catch (error) {
        toast.error(error.message || 'Unable to load admin data');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [user?.id]);

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Delete this course as admin?')) {
      return;
    }

    try {
      await deleteAdminCourse(user.id, courseId);
      setCourses((current) => current.filter((course) => course.id !== courseId));
      toast.success('Course deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Unable to delete course');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Delete user ${userName}?`)) {
      return;
    }

    try {
      await deleteAdminUser(user.id, userId);
      setUsers((current) => current.filter((account) => account.id !== userId));
      setCourses((current) => current.filter((course) => course.instructorId !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Unable to delete user');
    }
  };

  const handleStatusChange = async (courseId, status) => {
    try {
      setUpdatingCourseId(courseId);
      const updatedCourse = await updateAdminCourseStatus(user.id, courseId, status);
      setCourses((current) =>
        current.map((course) => (course.id === courseId ? { ...course, ...updatedCourse } : course))
      );
      toast.success(`Course marked as ${status}`);
    } catch (error) {
      toast.error(error.message || 'Unable to update course status');
    } finally {
      setUpdatingCourseId(null);
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        !courseSearch ||
        course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
        `${course.firstName || ''} ${course.lastName || ''}`.toLowerCase().includes(courseSearch.toLowerCase()) ||
        (course.category || '').toLowerCase().includes(courseSearch.toLowerCase());

      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [courses, courseSearch, statusFilter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <SEO
        title="Admin Management"
        description="Manage platform users and courses as an admin"
      />

      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
            <p className="text-gray-600 mt-1">Review users, courses, and platform-wide content from one place.</p>
          </div>
          <Link to="/admin/courses/create">
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary-100">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-semibold text-gray-900">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Published Courses</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {courses.filter((course) => course.status === 'published').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-600">Loading users...</p>
            ) : (
              <div className="space-y-4">
                {users.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{account.firstName} {account.lastName}</p>
                      <p className="text-sm text-gray-600">{account.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 capitalize">
                        {account.role}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(account.id, `${account.firstName} ${account.lastName}`)}
                        disabled={account.id === user.id}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">All Courses</h2>
                <Link to="/admin/courses/create">
                  <Button size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    placeholder="Search courses, instructor, or category"
                    className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-600">Loading courses...</p>
            ) : filteredCourses.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <p className="text-gray-600 mb-4">No courses match your current filters.</p>
                <Link to="/admin/courses/create">
                  <Button>Add First Course</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {course.firstName} {course.lastName} • {course.enrollmentCount || 0} students
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Created {course.createdAt ? formatDate(course.createdAt) : 'recently'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                        <select
                          value={course.status}
                          onChange={(e) => handleStatusChange(course.id, e.target.value)}
                          disabled={updatingCourseId === course.id}
                          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
