import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Cache key for localStorage
const USER_CACHE_KEY = 'coursehub_user_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get cached user data
  const getCachedUser = (uid) => {
    try {
      const cached = localStorage.getItem(USER_CACHE_KEY);
      if (cached) {
        const { data, timestamp, userId } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;
        if (!isExpired && userId === uid) {
          return data;
        }
      }
    } catch (e) {
      console.error('Cache read error:', e);
    }
    return null;
  };

  // Helper to set cached user data
  const setCachedUser = (uid, userData) => {
    try {
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify({
        data: userData,
        timestamp: Date.now(),
        userId: uid
      }));
    } catch (e) {
      console.error('Cache write error:', e);
    }
  };

  // Helper to clear cache
  const clearCache = () => {
    try {
      localStorage.removeItem(USER_CACHE_KEY);
    } catch (e) {
      console.error('Cache clear error:', e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to get cached data first
        const cachedData = getCachedUser(firebaseUser.uid);

        if (cachedData) {
          // Use cached data immediately for fast load
          setUser(cachedData);
          setLoading(false);
        } else {
          // Fetch from Firestore only if no cache
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};

            const userProfile = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: userData.firstName || firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: userData.lastName || firebaseUser.displayName?.split(' ')[1] || '',
              avatar: firebaseUser.photoURL,
              role: userData.role || 'student',
              bio: userData.bio || ''
            };

            setUser(userProfile);
            setCachedUser(firebaseUser.uid, userProfile);
          } catch (error) {
            console.warn('Error fetching user data (permissions or other). Falling back to auth-only profile:', error);
            const fallbackProfile = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firebaseUser.displayName?.split(' ')[1] || '',
              avatar: firebaseUser.photoURL,
              role: 'student',
              bio: ''
            };
            setUser(fallbackProfile);
            setCachedUser(firebaseUser.uid, fallbackProfile);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setUser(null);
        clearCache();
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      const sanitized = error.message.replace('Firebase: ', '').replace('Error (auth/', '').replace(')', '');
      return {
        success: false,
        error: sanitized,
        code: error.code || null,
        message: error.message
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user already exists in Firestore
      let userDocExists = false;
      try {
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        userDocExists = userDoc.exists();
      } catch (e) {
        console.warn('Could not read user document (permissions?), proceeding with auth-only user:', e);
        userDocExists = false;
      }

      if (!userDocExists) {
        const [firstName = 'User', lastName = ''] = (result.user.displayName || 'User').split(' ');
        const newUserData = {
          email: result.user.email,
          firstName,
          lastName,
          role: 'student',
          avatar: result.user.photoURL,
          bio: '',
          createdAt: new Date().toISOString()
        };

        try {
          await setDoc(doc(db, 'users', result.user.uid), newUserData);
        } catch (e) {
          console.warn('Failed to write user document on Google sign-in (permissions?), continuing without Firestore write:', e);
        }

        // Cache the new user data locally even if Firestore write failed
        setCachedUser(result.user.uid, {
          id: result.user.uid,
          email: result.user.email,
          firstName,
          lastName,
          role: 'student',
          avatar: result.user.photoURL,
          bio: ''
        });
      }

      return { success: true };
    } catch (error) {
      const code = error.code || '';
      let userMessage = error.message.replace('Firebase: ', '').replace('Error (auth/', '').replace(')', '');

      if (code === 'auth/popup-blocked' || code === 'auth/web-storage-unsupported') {
        userMessage = 'Popup blocked or storage unsupported. Please allow popups or try again.';
      }

      if (code === 'auth/popup-closed-by-user') {
        userMessage = 'Popup closed before completing sign-in.';
      }

      return {
        success: false,
        error: userMessage,
        code,
        message: error.message
      };
    }
  };

  const register = async ({ email, password, firstName, lastName, role }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name
      await updateFirebaseProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });

      const newUserData = {
        email,
        firstName,
        lastName,
        role,
        avatar: null,
        bio: '',
        createdAt: new Date().toISOString()
      };

      // Save user profile to Firestore (but tolerate permission errors)
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), newUserData);
      } catch (e) {
        console.warn('Failed to write user document on registration (permissions?), continuing with auth user only:', e);
      }

      // Update local state and cache
      const userProfile = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        firstName,
        lastName,
        role,
        avatar: null,
        bio: ''
      };

      setUser(userProfile);
      setCachedUser(userCredential.user.uid, userProfile);

      return { success: true };
    } catch (error) {
      const code = error.code || '';
      const sanitized = error.message.replace('Firebase: ', '').replace('Error (auth/', '').replace(')', '');
      let userMessage = sanitized;

      if (code === 'auth/email-already-in-use') {
        userMessage = 'An account with this email already exists. Try signing in instead.';
      }

      return {
        success: false,
        error: userMessage,
        code,
        message: error.message
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      clearCache();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const updateProfile = async (profileData) => {
    if (!auth.currentUser) return { success: false, error: 'No user logged in' };

    try {
      // Update Firebase Auth profile if name or avatar changed
      if (profileData.firstName || profileData.lastName || profileData.avatar) {
        await updateFirebaseProfile(auth.currentUser, {
          displayName: `${profileData.firstName || user.firstName} ${profileData.lastName || user.lastName}`,
          photoURL: profileData.avatar || user.avatar
        });
      }

      // Update Firestore document
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        ...profileData,
        email: user.email
      }, { merge: true });

      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      setCachedUser(auth.currentUser.uid, updatedUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    signInWithGoogle,
    isAuthenticated: !!user,
    isEducator: user?.role === 'educator' || user?.role === 'admin',
    isStudent: user?.role === 'student' || !user?.role,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
