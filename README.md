# CourseHub - Online Course Management System (Frontend Demo)

A comprehensive online course management system built with React, featuring separate interfaces for educators and students. This is a **frontend-only demo** with mock authentication and data.

## CourseHub Link  : https://course-hub-sage.vercel.app/

## 🔐 Demo Login Credentials

Use these credentials to test the application:

### Student Account
- **Email**: `student@a2.com`
- **Password**: `student123`
- **Role**: Student (can enroll in courses, submit assignments)

### Educator Account  
- **Email**: `educator@a2.com`
- **Password**: `educator123`
- **Role**: Educator (can create courses, manage students, grade assignments)


## 🚀 Features

### For Students
- **Dashboard**: Personalized overview of enrolled courses and progress
- **Course Catalog**: Browse and search courses with filtering
- **Course Viewer**: Access course materials, track progress, and complete lessons
- **Assignment Submission**: Submit assignments in various formats
- **Profile Management**: Manage personal information and preferences

### For Educators
- **Dashboard**: Overview of created courses, student enrollment, and activity
- **Course Creation**: Create and manage courses with modules and lessons
- **Student Management**: View enrolled students and track their progress
- **Assignment Management**: Create, grade, and manage assignments
- **Content Management**: Upload videos, PDFs, and other course materials

### Shared Features
- **Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **File Upload**: Support for various file types and sizes
- **Progress Tracking**: Real-time progress tracking for students
- **Search & Filter**: Advanced search and filtering capabilities

## 🛠️ Technology Stack

### Frontend Only
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Demo Features
- **Mock Authentication** - Hardcoded user credentials
- **Mock Data** - Sample courses, enrollments, and assignments
- **Local Storage** - Persistent login state and user data
- **Responsive Design** - Works on all device sizes

## 📁 Project Structure

```
CourseHub/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.jsx
│   ├── pages/                    # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CourseCatalog.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── CourseManagement.jsx
│   │   ├── CreateCourse.jsx
│   │   └── ... (other pages)
│   ├── utils/                    # Utility functions
│   │   ├── mockData.js           # Mock data for demo
│   │   └── helpers.js
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CourseHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173 (or 5174 if 5173 is in use)

5. **Login with demo credentials**
   - Use any of the provided demo accounts above
   - No registration needed - just login with the credentials

## 🎯 Demo Features

### What You Can Test
- **Authentication**: Login with different user roles
- **Course Browsing**: View course catalog with search and filters
- **Course Enrollment**: Enroll in courses as a student
- **Course Management**: Create and manage courses as an educator
- **Dashboard**: View role-specific dashboards
- **Profile Management**: Update user profiles
- **Responsive Design**: Test on different screen sizes

### Mock Data Includes
- **6 Sample Courses** across different categories
- **Student Enrollments** with progress tracking
- **Course Assignments** with submission status
- **User Profiles** for all three roles

## 🎨 UI Components

### Core Components
- **Button**: Customizable button with variants and loading states
- **Input**: Form input with validation and error states
- **Card**: Container component with header, content, and footer
- **Layout**: Main layout with sidebar navigation
- **ProtectedRoute**: Route protection based on authentication and roles

### Page Components
- **Home**: Landing page with features and call-to-action
- **Login/Register**: Authentication forms with validation
- **Dashboard**: Role-based dashboard for students and educators
- **CourseCatalog**: Course browsing with search and filters
- **CourseDetail**: Detailed course view with enrollment
- **Profile**: User profile management

## 🔐 Demo Authentication

### User Roles
- **Student**: Can enroll in courses, submit assignments, track progress
- **Educator**: Can create courses, manage students, grade assignments  
- **Admin**: Full system access and user management

### Demo Features
- **Mock Authentication**: Hardcoded credentials for testing
- **Persistent Login**: Uses localStorage to maintain session
- **Role-based Access**: Different interfaces based on user role

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Frontend Deployment
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Demo Deployment
This is a frontend-only demo that can be easily deployed to any static hosting service:
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions to build and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔮 Future Enhancements

- Video streaming integration
- Real-time notifications
- Advanced analytics and reporting
- Mobile app development
- Payment integration
- Multi-language support
- Advanced course authoring tools
- Discussion forums
- Certificate generation
- Integration with external LMS platforms
"# CourseHub-main" 
