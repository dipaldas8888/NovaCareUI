import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { api } from "@/services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: parseFirebaseError(error) };
    }
  };

  const registerPatient = async ({ username, email, password }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (username) await updateProfile(cred.user, { displayName: username });

      await api.post("/api/patients", { username, email, uid: cred.user.uid });

      return { success: true };
    } catch (error) {
      return { success: false, error: parseFirebaseError(error) };
    }
  };

  const registerDoctor = async ({ username, email, password, secret }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (username) await updateProfile(cred.user, { displayName: username });

      // OPTIONAL: create doctor profile / role on backend (using your secret gate)
      await api.post(`/api/doctors?secret=${encodeURIComponent(secret)}`, {
        username,
        email,
        uid: cred.user.uid,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: parseFirebaseError(error) };
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      return { success: true };
    } catch (error) {
      return { success: false, error: parseFirebaseError(error) };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      registerPatient,
      registerDoctor,
      googleLogin,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function parseFirebaseError(error) {
  const msg = error?.code || error?.message || "Authentication error";
  const map = {
    "auth/invalid-email": "Invalid email address.",
    "auth/user-not-found": "No account found for this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "Email already in use.",
    "auth/weak-password": "Password is too weak.",
    "auth/popup-closed-by-user": "Popup closed before completing sign in.",
  };
  return map[msg] || msg;
}
