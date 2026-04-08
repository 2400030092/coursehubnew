import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp, Users, DollarSign, BookOpen, ArrowUp, ArrowDown,
    Calendar, Download
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SEO } from '../../components/SEO';

// Mock data for charts
const enrollmentData = [
    { month: 'Jan', enrollments: 45, revenue: 2250 },
    { month: 'Feb', enrollments: 52, revenue: 2600 },
    { month: 'Mar', enrollments: 61, revenue: 3050 },
    { month: 'Apr', enrollments: 58, revenue: 2900 },
    { month: 'May', enrollments: 70, revenue: 3500 },
    { month: 'Jun', enrollments: 85, revenue: 4250 },
];

const courseData = [
    { name: 'Web Development', students: 245, color: '#8b5cf6' },
    { name: 'Data Science', students: 189, color: '#3b82f6' },
    { name: 'Design', students: 156, color: '#10b981' },
    { name: 'Marketing', students: 98, color: '#f59e0b' },
];

export const Analytics = () => {
    const [timeRange, setTimeRange] = useState('6m');

    const StatCard = ({ title, value, change, icon: Icon, trend }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${trend === 'up' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                    <Icon className={`h-6 w-6 ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {change}%
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <SEO
                title="Analytics Dashboard"
                description="View your course analytics, enrollment trends, and revenue metrics"
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Analytics Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track your course performance and student engagement
                    </p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <option value="1m">Last Month</option>
                        <option value="3m">Last 3 Months</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="1y">Last Year</option>
                    </select>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Revenue" value="$24,500" change={12.5} icon={DollarSign} trend="up" />
                <StatCard title="Total Students" value="688" change={8.2} icon={Users} trend="up" />
                <StatCard title="Active Courses" value="12" change={0} icon={BookOpen} trend="up" />
                <StatCard title="Avg. Completion" value="78%" change={-2.1} icon={TrendingUp} trend="down" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Enrollment Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Enrollment Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={enrollmentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="enrollments" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={enrollmentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Course Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Students by Course Category</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={courseData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="students"
                            >
                                {courseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="space-y-4">
                        {courseData.map((course, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: course.color }}></div>
                                    <span className="font-medium text-gray-900 dark:text-white">{course.name}</span>
                                </div>
                                <span className="text-gray-600 dark:text-gray-400">{course.students} students</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
