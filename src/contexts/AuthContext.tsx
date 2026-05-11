import { createContext, useContext, useState } from "react";
import type { User } from "../types";
import { USRS } from "../data/mockData";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "jesam_user_id";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? (USRS.find((u) => u.id === saved) ?? null) : null;
  });

  function login(email: string, _password: string): boolean {
    const user = USRS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return false;
    sessionStorage.setItem(STORAGE_KEY, user.id);
    setCurrentUser(user);
    return true;
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
  }

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
