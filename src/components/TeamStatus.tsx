
import { useState } from 'react';
import { useAuction } from '@/context/AuctionContext';
import { User, DollarSign, Users, Plane, Edit } from 'lucide-react';
import { formatPrice } from '@/data/players';
import PlayerCard from './PlayerCard';
import TeamCard from './TeamCard';
import { IPLCard } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '@/hooks/useAuth';

interface TeamStatusProps {
  teamName?: string; // If not provided, shows all teams
  showPlayers?: boolean;
  cardFormat?: boolean; // New prop to show teams in card format
}

const TeamStatus = ({ teamName, showPlayers = false, cardFormat = false }: TeamStatusProps) => {
  const { teams, updateTeamName } = useAuction();
  const { isAdmin } = useAuth();
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  
  // If teamName is provided, show only that team, otherwise show all teams
  // Add validation to ensure the team exists
  const teamsToShow = teamName && teams[teamName] 
    ? { [teamName]: teams[teamName] } 
    : teams;
  
  const toggleTeam = (name: string) => {
    setExpandedTeam(prev => prev === name ? null : name);
  };

  const handleEditTeamName = (team: string) => {
    setEditingTeam(team);
    setNewTeamName(team);
  };

  const handleSaveTeamName = (oldName: string) => {
    updateTeamName(oldName, newTeamName);
    setEditingTeam(null);
  };

  // If card format is requested, render teams as cards
  if (cardFormat) {
    return (
      <div className="glass-panel p-4 animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-ipl-purple">
          {teamName ? `${teamName} Status` : 'All Teams Status'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(teamsToShow).map((name, index) => {
            // Skip rendering if team doesn't exist
            if (!teamsToShow[name]) return null;
            
            return (
              <div 
                key={name} 
                className="animate-scale-in" 
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <TeamCard teamName={name} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Original list format
  return (
    <div className="glass-panel p-4 animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-ipl-purple">
        {teamName ? `${teamName} Status` : 'All Teams Status'}
      </h2>
      
      <div className="space-y-4">
        {Object.entries(teamsToShow).map(([name, team]) => {
          // Skip rendering if team is undefined
          if (!team) return null;
          
          return (
            <IPLCard key={name} className="overflow-hidden border">
              <div 
                className={`flex items-center ${editingTeam === name ? 'justify-between p-3 bg-gray-100' : 'justify-between p-3 bg-gray-50 cursor-pointer'}`}
                onClick={editingTeam === name ? undefined : () => toggleTeam(name)}
              >
                {editingTeam === name ? (
                  <div className="flex items-center space-x-2 w-full">
                    <Input 
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      className="max-w-xs"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveTeamName(name);
                      }}
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTeam(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-ipl-slate flex items-center justify-center text-white">
                        <User size={16} />
                      </div>
                      <span className="font-semibold ml-2 text-ipl-slate">{name}</span>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTeamName(name);
                          }}
                          className="ml-2 text-gray-500 hover:text-ipl-blue transition-colors"
                          title="Edit team name"
                        >
                          <Edit size={14} />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="font-medium">{team.purse} Cr</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Users size={16} className="text-blue-600" />
                        <span className="font-medium">{team.players.length}/13</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Plane size={16} className="text-orange-600" />
                        <span className="font-medium">{team.foreignPlayerCount}/5</span>
                      </div>
                      
                      <div className="text-ipl-blue transition-transform duration-300" style={{
                        transform: expandedTeam === name ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>
                        ▼
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {(expandedTeam === name || showPlayers) && editingTeam !== name && (
                <div className="p-3 animate-slide-down">
                  {team.players.length > 0 ? (
                    <div className="space-y-3">
                      {team.players.map((player, index) => (
                        <div 
                          key={player.id} 
                          className="animate-scale-in" 
                          style={{animationDelay: `${0.05 * index}s`}}
                        >
                          <PlayerCard key={player.id} player={player} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No players in this team yet
                    </div>
                  )}
                </div>
              )}
            </IPLCard>
          );
        })}
      </div>
    </div>
  );
};

export default TeamStatus;
