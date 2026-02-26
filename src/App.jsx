import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CourseCatalog } from './pages/CourseCatalog';
import { CourseDetail } from './pages/CourseDetail';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { CourseManagement } from './pages/CourseManagement';
import { CreateCourse } from './pages/CreateCourse';
import { EditCourse } from './pages/EditCourse';
import { StudentManagement } from './pages/StudentManagement';
import { AssignmentManagement } from './pages/AssignmentManagement';
import { CourseViewer } from './pages/CourseViewer';
import { AssignmentSubmission } from './pages/AssignmentSubmission';
import { Analytics } from './pages/instructor/Analytics';
import { Cart } from './pages/Cart';
import { Mentors } from './pages/Mentors';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProgressProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Routes>
                  {/* Public routes (wrapped with Layout for navbar/sidebar) */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Layout><Login /></Layout>} />
                  <Route path="/register" element={<Layout><Register /></Layout>} />
                  <Route path="/courses" element={<Layout><CourseCatalog /></Layout>} />
                  <Route path="/courses/:id" element={<Layout><CourseDetail /></Layout>} />
                  <Route path="/cart" element={<Layout><Cart /></Layout>} />
                  <Route path="/mentors" element={<Layout><Mentors /></Layout>} />

                  <Route path="/checkout" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <Layout><Checkout /></Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/payment" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <Layout><Payment /></Layout>
                    </ProtectedRoute>
                  } />

                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Layout>
                        <Profile />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  {/* Educator routes */}
                  <Route path="/instructor/courses" element={
                    <ProtectedRoute allowedRoles={['educator', 'admin']}>
                      <Layout>
                        <CourseManagement />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/instructor/courses/create" element={
                    <ProtectedRoute allowedRoles={['educator', 'admin']}>
                      <Layout>
                        <CreateCourse />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/instructor/courses/:id/edit" element={
                    <ProtectedRoute allowedRoles={['educator', 'admin']}>
                      <Layout>
                        <EditCourse />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/instructor/courses/:id/students" element={
                    <ProtectedRoute allowedRoles={['educator', 'admin']}>
                      <Layout>
                        <StudentManagement />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/instructor/courses/:id/assignments" element={
                    <ProtectedRoute allowedRoles={['educator', 'admin']}>
                      <Layout>
                        <AssignmentManagement />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/instructor/analytics" element={
                    <ProtectedRoute allowedRoles={['educator', 'admin']}>
                      <Layout>
                        <Analytics />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  {/* Student routes */}
                  <Route path="/course/:id/learn" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <Layout>
                        <CourseViewer />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/assignment/:id/submit" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <Layout>
                        <AssignmentSubmission />
                      </Layout>
                    </ProtectedRoute>
                  } />
                </Routes>

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </div>
            </Router>
          </CartProvider>
        </ProgressProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
