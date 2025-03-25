import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import PlayerList from '@/components/PlayerList';
import TeamStatus from '@/components/TeamStatus';
import { useAuction } from '@/context/AuctionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/data/players';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, DollarSign, Users, Plane } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { isAuthenticated, isTeamOwner, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlayer, players, teams } = useAuction();
  
  useEffect(() => {
    // Redirect if not authenticated or not a team owner
    if (!isAuthenticated || !isTeamOwner) {
      navigate('/');
    }
  }, [isAuthenticated, isTeamOwner, navigate]);
  
  // Determine which team the current user belongs to
  const currentTeam = user?.username || '';
  
  // Check if the current team exists
  useEffect(() => {
    if (isAuthenticated && isTeamOwner && !teams[currentTeam]) {
      toast({
        title: "Team not found",
        description: `Team "${currentTeam}" does not exist in the system.`,
        variant: "destructive",
      });
    }
  }, [isAuthenticated, isTeamOwner, currentTeam, teams]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#48C9B0', '#F4D03F'];
  
  // Generate data for charts
  const generateTeamData = () => {
    return Object.entries(teams)
      .filter(([_, team]) => team) // Filter out undefined teams
      .map(([name, team], index) => ({
        name,
        players: team.players.length,
        purse: team.purse,
        foreignPlayers: team.foreignPlayerCount,
        color: COLORS[index % COLORS.length]
      }));
  };
  
  const generateRoleData = () => {
    const roleCounts = {
      batsman: 0,
      bowler: 0,
      all_rounder: 0,
      wicket_keeper: 0
    };
    
    players.forEach(player => {
      if (player.status === 'sold') {
        roleCounts[player.role]++;
      }
    });
    
    return Object.entries(roleCounts).map(([role, count]) => ({
      name: role.replace('_', ' '),
      value: count
    }));
  };
  
  const teamData = generateTeamData();
  const roleData = generateRoleData();
  
  const { player: highestBidPlayer, amount: highestBidAmount } = useAuction().getHighestBid();
  
  // Determine current tab from location
  const getTabValue = () => {
    if (location.pathname === '/dashboard/teams') return 'teams';
    if (location.pathname === '/dashboard/stats') return 'stats';
    return 'players';
  };
  
  const handleTabChange = (value: string) => {
    switch (value) {
      case 'teams':
        navigate('/dashboard/teams');
        break;
      case 'stats':
        navigate('/dashboard/stats');
        break;
      default:
        navigate('/dashboard');
    }
  };
  
  return (
    <div className="page-transition min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={getTabValue()} onValueChange={handleTabChange} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-ipl-slate">Team Owner Dashboard</h1>
            <TabsList>
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="stats">Auction Stats</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="players" className="space-y-6">
            <TeamStatus teamName={currentTeam} showPlayers={true} />
            
            <div className="animate-fade-in">
              <PlayerList />
            </div>
          </TabsContent>
          
          <TabsContent value="teams" className="space-y-6">
            <div className="animate-fade-in">
              <TeamStatus teamName={currentTeam} showPlayers={true} />
            </div>
            
            <div className="animate-fade-in">
              <TeamStatus cardFormat={true} />
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="mr-2 text-yellow-500" size={20} />
                    Highest Bid
                  </CardTitle>
                  <CardDescription>Current auction record</CardDescription>
                </CardHeader>
                <CardContent>
                  {highestBidPlayer ? (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-ipl-purple">
                        {formatPrice(highestBidAmount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {highestBidPlayer.name} • {highestBidPlayer.soldTo}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">No bids yet</div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="mr-2 text-green-500" size={20} />
                    Your Purse
                  </CardTitle>
                  <CardDescription>Remaining budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ipl-blue">
                    {teams[currentTeam]?.purse || 0} Cr
                  </div>
                  <div className="text-sm text-gray-500">
                    Initial: 60 Cr • Spent: {60 - (teams[currentTeam]?.purse || 0)} Cr
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 text-blue-500" size={20} />
                    Your Squad
                  </CardTitle>
                  <CardDescription>Team composition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-bold text-ipl-slate">
                        {teams[currentTeam]?.players.length || 0}/15
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Players
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-ipl-orange flex items-center">
                        {teams[currentTeam]?.foreignPlayerCount || 0}/5
                        <Plane className="ml-2" size={20} />
                      </div>
                      <div className="text-sm text-gray-500">
                        Foreign Players
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Comparison</CardTitle>
                  <CardDescription>Players and purse by team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={teamData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={false} />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="players" stroke="#8884d8" name="Players" />
                        <Line yAxisId="right" type="monotone" dataKey="purse" stroke="#82ca9d" name="Purse (Cr)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sold Players by Role</CardTitle>
                  <CardDescription>Distribution of player specializations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roleData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {roleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
