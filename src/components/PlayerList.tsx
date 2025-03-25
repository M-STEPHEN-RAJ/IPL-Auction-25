
import { useState } from 'react';
import { useAuction } from '@/context/AuctionContext';
import PlayerCard from '@/components/PlayerCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface FilterOptions {
  status: string[];
  role: string[];
  nationality: string[];
}

const PlayerList = () => {
  const { filteredPlayers, searchTerm, setSearchTerm } = useAuction();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    role: [],
    nationality: []
  });

  // Apply filters to players
  const applyFilters = () => {
    let filtered = filteredPlayers;
    
    if (filters.status.length > 0) {
      filtered = filtered.filter(player => filters.status.includes(player.status));
    }
    
    if (filters.role.length > 0) {
      filtered = filtered.filter(player => filters.role.includes(player.role));
    }
    
    if (filters.nationality.length > 0) {
      filtered = filtered.filter(player => 
        filters.nationality.includes(player.isIndian ? 'indian' : 'foreign')
      );
    }
    
    return filtered;
  };
  
  const displayPlayers = applyFilters();

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value];
        
      return { ...prev, [category]: updatedCategory };
    });
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      role: [],
      nationality: []
    });
  };

  return (
    <div className="glass-panel p-4 h-full flex flex-col">
      <div className="mb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-ipl-blue text-white' : ''}
          >
            <Filter size={18} />
          </Button>
        </div>
        
        {showFilters && (
          <div className="mt-3 bg-gray-50 p-3 rounded-md animate-slide-down">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Status</h4>
                <div className="space-y-1">
                  {['available', 'sold', 'unsold'].map(status => (
                    <div key={status} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`status-${status}`}
                        checked={filters.status.includes(status)}
                        onChange={() => toggleFilter('status', status)}
                        className="rounded text-ipl-blue focus:ring-ipl-blue mr-2"
                      />
                      <label htmlFor={`status-${status}`} className="text-sm capitalize">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Role</h4>
                <div className="space-y-1">
                  {['batsman', 'bowler', 'all_rounder', 'wicket_keeper'].map(role => (
                    <div key={role} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`role-${role}`}
                        checked={filters.role.includes(role)}
                        onChange={() => toggleFilter('role', role)}
                        className="rounded text-ipl-blue focus:ring-ipl-blue mr-2"
                      />
                      <label htmlFor={`role-${role}`} className="text-sm capitalize">
                        {role.replace('_', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Nationality</h4>
                <div className="space-y-1">
                  {['indian', 'foreign'].map(nationality => (
                    <div key={nationality} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`nationality-${nationality}`}
                        checked={filters.nationality.includes(nationality)}
                        onChange={() => toggleFilter('nationality', nationality)}
                        className="rounded text-ipl-blue focus:ring-ipl-blue mr-2"
                      />
                      <label htmlFor={`nationality-${nationality}`} className="text-sm capitalize">
                        {nationality}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-3">
          {displayPlayers.length > 0 ? (
            displayPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No players match your search/filters
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-500">
        Showing {displayPlayers.length} of {filteredPlayers.length} players
      </div>
    </div>
  );
};

export default PlayerList;
