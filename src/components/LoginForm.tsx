
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLocalData, setHasLocalData] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if auction data exists in localStorage
    const hasData = localStorage.getItem('ipl_auction_state') !== null;
    setHasLocalData(hasData);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        // Redirect based on role
        if (username.toLowerCase() === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
        
        if (hasLocalData) {
          toast({
            title: "Saved Data Available",
            description: "Your previous auction data has been loaded.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during login.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel w-full max-w-md p-8 animate-scale-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-ipl-purple">IPL Auction Login</h2>
      
      {hasLocalData && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
          <p className="text-green-700 text-sm">
            Previous auction data found! Log in to continue where you left off.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username (Team Name / Admin)
          </label>
          <Input
            id="username"
            type="text"
            placeholder="Enter admin name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            <br />
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full btn-ipl" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
