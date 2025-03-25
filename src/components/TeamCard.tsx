
import { useState } from 'react';
import { useAuction } from '@/context/AuctionContext';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Users, Plane, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PlayerCard from './PlayerCard';

interface TeamCardProps {
  teamName: string;
  onClick?: () => void;
}

const TeamCard = ({ teamName, onClick }: TeamCardProps) => {
  const { teams } = useAuction();
  const { isAdmin } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  const team = teams[teamName];
  if (!team) {
    // Render a placeholder or error card when team doesn't exist
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all duration-300 animate-scale-in cursor-pointer bg-gray-100">
        <CardHeader className="py-4">
          <h3 className="text-lg font-bold text-gray-500">{teamName} - Not Found</h3>
        </CardHeader>
      </Card>
    );
  }
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!isExpanded) {
      // Navigate to team page when clicking on a collapsed card
      navigate(`/${encodeURIComponent(teamName)}`);
    } else {
      setIsExpanded(false);
    }
  };
  
  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const totalSpent = 50 - team.purse;
  
  // Get gradient color based on team name
  const getTeamGradient = () => {
    const teamIndex = parseInt(teamName.replace('Team', '')) || 1;
    const gradients = [
      'from-blue-100 to-blue-50',
      'from-green-100 to-green-50',
      'from-yellow-100 to-yellow-50',
      'from-red-100 to-red-50',
      'from-purple-100 to-purple-50',
      'from-orange-100 to-orange-50',
      'from-pink-100 to-pink-50',
      'from-indigo-100 to-indigo-50'
    ];
    return gradients[(teamIndex - 1) % gradients.length];
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all duration-300 animate-scale-in cursor-pointer" 
      onClick={handleClick}
    >
      <div>
        <CardHeader className={`flex flex-row justify-between items-center py-4 bg-gradient-to-r ${getTeamGradient()}`}>
          <h3 className="text-lg font-bold text-ipl-slate">{teamName}</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <DollarSign size={16} className="text-green-600 mr-1" />
              <span className="font-medium">{team.purse} Cr</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Users size={16} className="text-blue-600 mr-1" />
              <span className="font-medium">{team.players.length}/13</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Plane size={16} className="text-orange-600 mr-1" />
              <span className="font-medium">{team.foreignPlayerCount}/5</span>
            </div>
            
            <div 
              className="relative z-10" 
              onClick={handleExpandToggle}
            >
              <ChevronRight size={18} className={`text-ipl-blue transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </div>
          </div>
        </CardHeader>
      </div>
      
      {isExpanded && (
        <CardContent className="animate-fade-in">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Total Purse</div>
              <div className="text-xl font-bold text-ipl-blue">50 Cr</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Spent</div>
              <div className="text-xl font-bold text-ipl-purple">{totalSpent.toFixed(2)} Cr</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Remaining</div>
              <div className="text-xl font-bold text-green-600">{team.purse.toFixed(2)} Cr</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Players</div>
              <div className="text-xl font-bold text-ipl-slate">{team.players.length}/13</div>
            </div>
          </div>
          
          {team.players.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-none">
              <h4 className="font-medium mb-2 text-ipl-slate">Players</h4>
              {team.players.map(player => (
                <PlayerCard 
                  key={player.id} 
                  player={player} 
                  showDetails={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No players in this team yet
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default TeamCard;
