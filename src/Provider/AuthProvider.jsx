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
    setMyImports([]);
    setMyExports([]);
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // === Fetch My Imports ===
  const fetchMyImports = async (currentUser) => {
    if (!currentUser?.email) return; // email check করুন
    try {
      const token = await currentUser.getIdToken(true); // force refresh
      const res = await fetch("https://car-hub-server-rlpm.vercel.app/my-imports", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: 'include', // এটা add করুন
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setMyImports(data.result || []);
      } else {
        console.error("Import fetch failed:", data.message);
        setMyImports([]);
      }
    } catch (err) {
      console.error("Failed to fetch imports:", err);
      setMyImports([]);
    }
  };

  // === Fetch My Exports ===
  const fetchMyExports = async (currentUser) => {
    if (!currentUser?.email) return; // email check করুন
    try {
      const token = await currentUser.getIdToken(true); // force refresh
      const res = await fetch("https://car-hub-server-rlpm.vercel.app/my-exports", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: 'include', // এটা add করুন
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setMyExports(data.result || []);
      } else {
        console.error("Export fetch failed:", data.message);
        setMyExports([]);
      }
    } catch (err) {
      console.error("Failed to fetch exports:", err);
      setMyExports([]);
    }
  };

  // === Observe Auth ===
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser) {
        // একটু delay দিন token generate হতে
        await new Promise(resolve => setTimeout(resolve, 500));
        await fetchMyImports(currentUser);
        await fetchMyExports(currentUser);
      } else {
        setMyImports([]);
        setMyExports([]);
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // === Real-time Import Updates ===
  useEffect(() => {
    const handleImportAdded = (e) => {
      const newImport = e.detail;
      setMyImports((prev) => {
        if (prev.some((i) => i._id === newImport._id)) return prev;
        return [...prev, newImport];
      });
    };

    const handleImportRemoved = (e) => {
      const removedId = e.detail;
      setMyImports((prev) => prev.filter((i) => i._id !== removedId));
    };

    window.addEventListener("importAdded", handleImportAdded);
    window.addEventListener("importRemoved", handleImportRemoved);

    return () => {
      window.removeEventListener("importAdded", handleImportAdded);
      window.removeEventListener("importRemoved", handleImportRemoved);
    };
  }, []);

  const authInfo = {
    user,
    loading,
    myImports,
    setMyImports,
    myExports,
    setMyExports,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    fetchMyImports, // এটা expose করুন
    fetchMyExports, // এটা expose করুন
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;