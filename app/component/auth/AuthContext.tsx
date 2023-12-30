import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  token: string | null;
  roles: string[];
  login: (data: { token: string; roles: string[] }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  const login = (data: { token: string; roles: string[] }) => {
    setLoggedIn(true);
    setToken(data.token);
    setRoles(data.roles);
  };

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
