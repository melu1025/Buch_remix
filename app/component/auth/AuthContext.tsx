import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  token: string;
  roles: string[];
  updateAuthInfo: (token: string, roles: string[]) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);

  const updateAuthInfo = (newToken: string, newRoles: string[]) => {
    setToken(newToken);
    setRoles(newRoles);
  };

  const contextValues: AuthContextType = {
    token,
    roles,
    updateAuthInfo,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
