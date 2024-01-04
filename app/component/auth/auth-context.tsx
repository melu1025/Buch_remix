import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextProperties {
  isLoggedIn: boolean;
  token: string | undefined;
  roles: string[];
  login: (data: { token: string; roles: string[] }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProperties | undefined>(undefined);

interface AuthProviderProperties {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProperties> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [roles, setRoles] = useState<string[]>([]);

  const login = (data: { token: string; roles: string[] }) => {
    setLoggedIn(true);
    setToken(data.token);
    setRoles(data.roles);
  };

  const logout = () => {
    setLoggedIn(false);
    setToken('');
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProperties => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
