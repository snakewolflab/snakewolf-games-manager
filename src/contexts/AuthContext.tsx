// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ロールの型定義
export type UserRole = 'admin' | 'developer' | 'internal' | 'normal';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 初期状態は未認証、ロールは'normal'（通常者）とする
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('normal');

  const login = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    // 実際にはFirebase Authenticationのログイン処理を行う
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('normal'); // ログアウトしたら通常者モードに戻す
    // 実際にはFirebase Authenticationのログアウト処理を行う
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};