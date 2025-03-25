
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

export type UserRole = 'admin' | 'team_owner';

export interface User {
  username: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTeamOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // For admin login
    if (username.toLowerCase() === 'admin' && password === 'admin') {
      const userData: User = { username: 'Admin', role: 'admin' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: "Welcome Admin",
        description: "You have successfully logged in as administrator.",
      });
      return true;
    }
    
    // List of valid team names
    const validTeams = [
      'Mumbai Indians',
      'Chennai Super Kings',
      'Royal Challengers Bangalore',
      'Kolkata Knight Riders',
      'Delhi Capitals',
      'Punjab Kings',
      'Rajasthan Royals',
      'Sunrisers Hyderabad'
    ];
    
    // For team owner login (teams numbered 1-8)
    if (validTeams.includes(username) && password >= '1' && password <= '8') {
      const userData: User = { username, role: 'team_owner' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: `Welcome ${username}`,
        description: "You have successfully logged in as team owner.",
      });
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid username or password.",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isTeamOwner = user?.role === 'team_owner';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isAdmin, 
      isTeamOwner 
    }}>
      {!isLoading && children}
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
