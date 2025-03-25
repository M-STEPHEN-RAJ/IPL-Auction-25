
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuction } from '@/context/AuctionContext';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import PlayerCard from '@/components/PlayerCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Users, Plane, Trophy, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/data/players';
import { Skeleton } from '@/components/ui/skeleton';

const TeamDetailsPage = () => {
  const { teamName } = useParams<{ teamName: string }>();
  const navigate = useNavigate();
  const { teams } = useAuction();
  const { isAdmin, isTeamOwner, user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Simulate loading for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const decodedTeamName = teamName ? decodeURIComponent(teamName) : '';
  const team = teams[decodedTeamName];
  
  // Redirect if team not found
  useEffect(() => {
    if (!loading && !team) {
      if (isAdmin) {
        navigate('/admin');
      } else if (isTeamOwner) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [team, loading, isAdmin, isTeamOwner, navigate]);
  
  // Check if user has access to this team page
  const hasAccess = isAdmin || (isTeamOwner && user?.username === decodedTeamName);
  
  useEffect(() => {
    if (!loading && !hasAccess) {
      if (isTeamOwner) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [hasAccess, loading, isTeamOwner, navigate]);
  
  if (loading || !team) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-24" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
          
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </main>
      </div>
    );
  }
  
  const totalSpent = 50 - team.purse;
  const goBack = () => {
    if (isAdmin) {
      navigate('/admin/teams');
    } else {
      navigate('/dashboard/teams');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-ipl-slate">{decodedTeamName}</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-scale-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="mr-2 text-green-500" size={20} />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Total Purse</div>
                  <div className="text-xl font-bold text-ipl-blue">50 Cr</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Spent</div>
                  <div className="text-xl font-bold text-ipl-purple">{totalSpent.toFixed(2)} Cr</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Remaining</div>
                  <div className="text-xl font-bold text-green-600">{team.purse.toFixed(2)} Cr</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-scale-in" style={{animationDelay: '0.1s'}}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 text-blue-500" size={20} />
                Squad Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Total Players</div>
                  <div className="text-xl font-bold text-ipl-slate">{team.players.length}/13</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Foreign Players</div>
                  <div className="text-xl font-bold text-ipl-orange flex items-center">
                    {team.foreignPlayerCount}/5
                    <Plane className="ml-2" size={16} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-scale-in" style={{animationDelay: '0.2s'}}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Trophy className="mr-2 text-yellow-500" size={20} />
                Team Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Highest Bid</div>
                  {team.players.length > 0 ? (
                    <div className="text-xl font-bold text-ipl-purple">
                      {formatPrice(Math.max(...team.players.filter(p => p.soldPrice).map(p => p.soldPrice || 0)))}
                    </div>
                  ) : (
                    <div className="text-gray-400">No players yet</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-xl font-bold mb-4 text-ipl-slate">Players ({team.players.length})</h2>
        
        {team.players.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.players.map((player, index) => (
              <div 
                key={player.id} 
                className="animate-scale-in" 
                style={{animationDelay: `${0.1 * (index % 6)}s`}}
              >
                <PlayerCard player={player} showDetails={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 border rounded-lg">
            No players in this team yet
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamDetailsPage;
