import React, { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
