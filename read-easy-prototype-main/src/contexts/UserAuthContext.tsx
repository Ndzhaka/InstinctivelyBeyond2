
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserAuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => boolean;
  isAuthenticated: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

interface UserAuthProviderProps {
  children: React.ReactNode;
}

export const UserAuthProvider = ({ children }: UserAuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simulate login validation
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (savedUsers.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    const updatedUsers = [...savedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return true;
  };

  return (
    <UserAuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      isAuthenticated: !!user
    }}>
      {children}
    </UserAuthContext.Provider>
  );
};
