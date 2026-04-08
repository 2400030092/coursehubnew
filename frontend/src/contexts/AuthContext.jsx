import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const USER_CACHE_KEY = 'coursehub_user_cache';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to parse cached user', error);
    return null;
  }
};

const storeUser = (user) => {
  localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
};

const clearStoredUser = () => {
  localStorage.removeItem(USER_CACHE_KEY);
};

const parseError = async (response, fallbackMessage) => {
  try {
    const data = await response.json();
    return data.message || data.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUser = getStoredUser();
    if (cachedUser) {
      setUser(cachedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        return {
          success: false,
          error: await parseError(response, 'Login failed')
        };
      }

      const userData = await response.json();
      setUser(userData);
      storeUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: 'Unable to reach the backend server'
      };
    }
  };

  const register = async ({ email, password, firstName, lastName, role }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, firstName, lastName, role })
      });

      if (!response.ok) {
        return {
          success: false,
          error: await parseError(response, 'Registration failed')
        };
      }

      const userData = await response.json();
      setUser(userData);
      storeUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: 'Unable to reach the backend server'
      };
    }
  };

  const logout = async () => {
    setUser(null);
    clearStoredUser();
  };

  const updateProfile = async (profileData) => {
    if (!user?.id) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        return {
          success: false,
          error: await parseError(response, 'Profile update failed')
        };
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      storeUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return {
        success: false,
        error: 'Unable to reach the backend server'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isEducator: user?.role === 'educator',
    isStudent: user?.role === 'student' || !user?.role,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
