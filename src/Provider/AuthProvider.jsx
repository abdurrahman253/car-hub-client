// src/Provider/AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Utils/Firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myImports, setMyImports] = useState([]);
  const [myExports, setMyExports] = useState([]);

  // Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    setMyImports([]); // Clear imports on logout
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Observe user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Optional: Fetch imports on login
        fetchMyImports(currentUser);
      } else {
        setMyImports([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch imports from backend
  const fetchMyImports = async (currentUser) => {
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch("http://localhost:5000/my-imports", {
        headers: { authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMyImports(data.result);
      }
    } catch (err) {
      console.error("Failed to fetch imports:", err);
    }
  };

  // Listen for real-time import updates
  useEffect(() => {
    const handleImportAdded = (e) => {
      const newImport = e.detail;
      setMyImports(prev => {
        // Avoid duplicates
        if (prev.some(i => i._id === newImport._id)) return prev;
        return [...prev, newImport];
      });
    };

    const handleImportRemoved = (e) => {
      const removedId = e.detail;
      setMyImports(prev => prev.filter(i => i._id !== removedId));
    };

    window.addEventListener('importAdded', handleImportAdded);
    window.addEventListener('importRemoved', handleImportRemoved);

    return () => {
      window.removeEventListener('importAdded', handleImportAdded);
      window.removeEventListener('importRemoved', handleImportRemoved);
    };
  }, []);

  const authInfo = {
    user,
    loading,
    myImports,
    setMyImports, 
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    fetchMyImports, 
    myExports,
    setMyExports,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;