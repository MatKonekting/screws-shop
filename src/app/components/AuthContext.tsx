import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for user session in cookies
    const cookieUser = Cookies.get('screws_user');
    if (cookieUser) {
      try {
        setUser(JSON.parse(cookieUser));
      } catch (e) {
        Cookies.remove('screws_user');
      }
    }
  }, []);

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('screws_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem('screws_users', JSON.stringify(users));

    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userWithoutPassword);
    
    // Store user session in cookie (expires in 30 days)
    Cookies.set('screws_user', JSON.stringify(userWithoutPassword), { expires: 30 });

    return true;
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('screws_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const userWithoutPassword = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userWithoutPassword);
      
      // Store user session in cookie (expires in 30 days)
      Cookies.set('screws_user', JSON.stringify(userWithoutPassword), { expires: 30 });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('screws_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
