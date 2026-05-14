import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  user: { id: string; email: string } | null;
  role: string | null;
  setUser: React.Dispatch<React.SetStateAction<{ id: string; email: string } | null>>;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  signOut: () => void; // ✅ added
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [role, setRole] = useState<string | null>(
  localStorage.getItem("role")
);

  const signOut = () => {
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};