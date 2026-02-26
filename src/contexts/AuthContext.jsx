import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile,
  GoogleAuthProvider,
  signInWithPopup,
        const result = await getRedirectResult(auth);
        if (!mounted) return;

        // If redirect result exists, we simply cache an auth-only user profile locally.
        if (result?.user) {
          const [firstName = 'User', lastName = ''] = (result.user.displayName || 'User').split(' ');
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
          // No cached profile — create an auth-only profile immediately and avoid Firestore reads
          const authOnlyProfile = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
            lastName: firebaseUser.displayName?.split(' ')[1] || '',
            avatar: firebaseUser.photoURL,
            role: 'student',
            bio: ''
          };

          setUser(authOnlyProfile);
          setCachedUser(firebaseUser.uid, authOnlyProfile);
          setLoading(false);
        }
      } else {
        setUser(null);
        clearCache();
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Handle redirect sign-in results (for browsers where popups are blocked)
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!mounted) return;

        if (result?.user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', result.user.uid));
            if (!userDoc.exists()) {
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
                console.warn('Failed to write user document after redirect sign-in (permissions?), continuing:', e);
              }

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
          } catch (e) {
            console.warn('Error processing redirect sign-in result:', e);
          }
        }
      } catch (e) {
        // getRedirectResult throws if no redirect or on other errors; ignore silently
      }
    })();

    return () => { mounted = false; };
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
      // Cache auth-only profile locally; avoid Firestore reads/writes during sign-in
      const [firstName = 'User', lastName = ''] = (result.user.displayName || 'User').split(' ');
      setCachedUser(result.user.uid, {
        id: result.user.uid,
        email: result.user.email,
        firstName,
        lastName,
        role: 'student',
        avatar: result.user.photoURL,
        bio: ''
      });

      return { success: true };
    } catch (error) {
      const code = error.code || '';
      let userMessage = error.message.replace('Firebase: ', '').replace('Error (auth/', '').replace(')', '');

      // If popups are blocked, fall back to redirect-based sign-in
      if (code === 'auth/popup-blocked' || code === 'auth/web-storage-unsupported') {
        try {
          const provider = new GoogleAuthProvider();
          // Start redirect sign-in flow; this will navigate away
          await signInWithRedirect(auth, provider);
          return { success: true, redirected: true };
        } catch (redirectError) {
          const redirectMsg = redirectError.message?.replace('Firebase: ', '') || 'Redirect sign-in failed';
          return { success: false, error: redirectMsg, code: redirectError.code || null, message: redirectError.message };
        }
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

      // Update Firestore document (non-blocking; tolerate permission errors)
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          ...profileData,
          email: user.email
        }, { merge: true });
      } catch (e) {
        console.warn('Failed to update Firestore profile (permissions?), continuing with local state:', e);
      }

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
