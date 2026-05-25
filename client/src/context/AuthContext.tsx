import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getCurrentUserApi } from "../api/auth.api";
import type { User } from "../types";

type AuthContextValue = {
  token: string | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  useEffect(() => {
    if (token && !user) {
      getCurrentUserApi()
        .then((response) => {
          if (response.data.success) {
            const current = response.data.data;
            setUser({
              id: current._id || current.id,
              name: current.name,
              email: current.email,
            });
          }
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, [token, user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);

    try {
      const response = await getCurrentUserApi();

      if (response.data.success) {
        const current = response.data.data;
        setUser({
          id: current._id || current.id,
          name: current.name,
          email: current.email,
        });
      }
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
