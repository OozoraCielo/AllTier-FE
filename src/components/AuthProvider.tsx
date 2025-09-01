// src/context/AuthContext.tsx

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { 
  DecodedToken, 
  decodeToken, 
  getAccessTokenFromCookie, 
  saveAccessTokenToCookie,
  removeAccessTokenFromCookie, 
  removeRefreshTokenFromCookie 
} from "@/utils/authUtil"; 

interface AuthContextType {
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessTokenFromCookie();
    if (token) {
      const decodedData = decodeToken(token);
      setUser(decodedData);
    }
  }, []);

  const login = (token: string) => {
    saveAccessTokenToCookie(token); 
    const decodedData = decodeToken(token);
    setUser(decodedData);
  };
  
  const logout = () => {
    removeAccessTokenFromCookie();
    removeRefreshTokenFromCookie();
    setUser(null);
    router.push("/");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}