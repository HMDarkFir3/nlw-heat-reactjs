import { createContext, useState, useEffect, ReactNode } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextData);

interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface AuthContextData {
  user: User | null;
  signInUrl: string;
}

interface AuthProvider {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: User;
}

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=a8cf5e3a92b32b6ffd06`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("/authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem("@dowhile:token", token);
    setUser(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInUrl }}>
      {children}
    </AuthContext.Provider>
  );
}
