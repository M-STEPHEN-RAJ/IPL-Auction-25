
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, TrendingUp, User, Users, RefreshCw } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuction } from '@/context/AuctionContext';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from 'lucide-react';

const Navigation = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { resetAuction } = useAuction();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold ipl-gradient bg-clip-text text-transparent">
              IPL Auction System
            </div>
          </div>
          
          {user && (
            <div className="hidden md:flex space-x-4">
              {isAdmin ? (
                // Admin navigation
                <>
                  <Link
                    to="/admin"
                    className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                  >
                    <Users className="w-4 h-4 mr-2 inline" />
                    Players
                  </Link>
                  <Link
                    to="/admin/teams"
                    className={`nav-link ${location.pathname === '/admin/teams' ? 'active' : ''}`}
                  >
                    <User className="w-4 h-4 mr-2 inline" />
                    Teams
                  </Link>
                  <Link
                    to="/admin/stats"
                    className={`nav-link ${location.pathname === '/admin/stats' ? 'active' : ''}`}
                  >
                    <TrendingUp className="w-4 h-4 mr-2 inline" />
                    Auction Stats
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsResetDialogOpen(true)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Auction
                  </Button>
                </>
              ) : (
                // Team owner navigation
                <>
                  <Link
                    to="/dashboard"
                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                  >
                    <Users className="w-4 h-4 mr-2 inline" />
                    Players
                  </Link>
                  <Link
                    to="/dashboard/teams"
                    className={`nav-link ${location.pathname === '/dashboard/teams' ? 'active' : ''}`}
                  >
                    <User className="w-4 h-4 mr-2 inline" />
                    Teams
                  </Link>
                  <Link
                    to="/dashboard/stats"
                    className={`nav-link ${location.pathname === '/dashboard/stats' ? 'active' : ''}`}
                  >
                    <TrendingUp className="w-4 h-4 mr-2 inline" />
                    Auction Stats
                  </Link>
                </>
              )}
            </div>
          )}
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700 hidden sm:block">
                {user.role === 'admin' ? 'Admin' : user.username}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="text-red-500 mr-2" size={20} />
              Reset Auction
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will reset the entire auction. All player assignments, team budgets, and statuses will be restored to their initial state. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                resetAuction();
                setIsResetDialogOpen(false);
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Navigation;
