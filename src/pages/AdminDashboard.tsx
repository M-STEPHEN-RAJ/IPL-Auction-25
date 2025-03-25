
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import PlayerList from '@/components/PlayerList';
import PlayerCard from '@/components/PlayerCard';
import TeamStatus from '@/components/TeamStatus';
import AuctionActions from '@/components/AuctionActions';
import { useAuction } from '@/context/AuctionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/data/players';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, DollarSign, Users, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlayer, players, teams } = useAuction();
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#48C9B0', '#F4D03F'];
  
  const generateTeamData = () => {
    return Object.entries(teams).map(([name, team], index) => ({
      name,
      players: team.players.length,
      purse: team.purse,
      foreignPlayers: team.foreignPlayerCount,
      color: COLORS[index % COLORS.length]
    }));
  };
  
  const generatePlayerStatusData = () => {
    const statusCounts = {
      available: 0,
      sold: 0,
      unsold: 0
    };
    
    players.forEach(player => {
      statusCounts[player.status]++;
    });
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));
  };
  
  const teamData = generateTeamData();
  const playerStatusData = generatePlayerStatusData();
  
  const { player: highestBidPlayer, amount: highestBidAmount } = useAuction().getHighestBid();
  
  const getTabValue = () => {
    if (location.pathname === '/admin/teams') return 'teams';
    if (location.pathname === '/admin/stats') return 'stats';
    return 'players';
  };
  
  const handleTabChange = (value: string) => {
    switch (value) {
      case 'teams':
        navigate('/admin/teams');
        break;
      case 'stats':
        navigate('/admin/stats');
        break;
      default:
        navigate('/admin');
    }
  };

  return (
    <div className="page-transition min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={getTabValue()} onValueChange={handleTabChange} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-ipl-purple">Admin Dashboard</h1>
            <TabsList>
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="stats">Auction Stats</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="players" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="glass-panel p-4">
                {selectedPlayer ? (
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-ipl-purple">Player Details</h2>
                    <PlayerCard player={selectedPlayer} showDetails={true} />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-ipl-purple">Player Details</h2>
                    <div className="text-center py-8 text-gray-500">
                      Select a player to view details
                    </div>
                  </div>
                )}
              </div>
              
              <AuctionActions />
            </div>
            
            <div className="animate-fade-in">
              <PlayerList />
            </div>
          </TabsContent>
          
          <TabsContent value="teams" className="space-y-6">
            <div className="animate-fade-in">
              <TeamStatus cardFormat={true} />
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="mr-2 text-yellow-500" size={20} />
                    Highest Bid
                  </CardTitle>
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
                    Total Spent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ipl-blue">
                    {(400 - Object.values(teams).reduce((sum, team) => sum + team.purse, 0)).toFixed(2)} Cr
                  </div>
                  <div className="text-sm text-gray-500">
                    Out of 400 Cr total purse
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Check className="mr-2 text-green-500" size={20} />
                    Sold Players
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ipl-slate">
                    {players.filter(p => p.status === 'sold').length}
                  </div>
                  <div className="text-sm text-gray-500">
                    Out of {players.length} total players
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <X className="mr-2 text-red-500" size={20} />
                    Unsold Players
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {players.filter(p => p.status === 'unsold').length}
                  </div>
                  <div className="text-sm text-gray-500">
                    Out of {players.length} total players
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Comparison</CardTitle>
                  <CardDescription>Players acquired and remaining purse</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={false} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="players" name="Players" fill="#8884d8" />
                        <Bar dataKey="purse" name="Remaining Purse (Cr)" fill="#82ca9d" />
                        <Bar dataKey="foreignPlayers" name="Foreign Players" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Player Status</CardTitle>
                  <CardDescription>Distribution of player statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={playerStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {playerStatusData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.name === 'Sold' ? '#82ca9d' : entry.name === 'Unsold' ? '#ff8042' : '#8884d8'} 
                            />
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

export default AdminDashboard;
