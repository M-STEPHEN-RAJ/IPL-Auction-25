
import { useState } from 'react';
import { useAuction } from '@/context/AuctionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatPrice } from '@/data/players';
import { Undo, User, Star } from 'lucide-react';

const AuctionActions = () => {
  const { 
    selectedPlayer, 
    teams, 
    assignPlayerToTeam,
    removePlayerFromTeam,
    markPlayerUnsold,
    undoLastAssignment
  } = useAuction();
  
  const [bidAmount, setBidAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  
  const handleAssignPlayer = () => {
    if (!selectedPlayer || !selectedTeam || !bidAmount) return;
    
    const bidValue = parseInt(bidAmount);
    if (isNaN(bidValue) || bidValue <= 0) return;
    
    assignPlayerToTeam(selectedPlayer.id, selectedTeam, bidValue);
    setBidAmount('');
    setSelectedTeam('');
  };
  
  const handleRemovePlayer = () => {
    if (!selectedPlayer || !selectedPlayer.soldTo) return;
    removePlayerFromTeam(selectedPlayer.id, selectedPlayer.soldTo);
  };
  
  const handleMarkUnsold = () => {
    if (!selectedPlayer || selectedPlayer.status !== 'available') return;
    
    // Mark as unsold - now using the proper markPlayerUnsold function
    markPlayerUnsold(selectedPlayer.id);
  };

  return (
    <div className="glass-panel p-4 animate-fade-in bg-gradient-to-br from-white via-gray-50 to-white">
      <h2 className="text-xl font-bold mb-4 text-ipl-purple">Auction Actions</h2>
      
      {selectedPlayer ? (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <h3 className="font-medium">Selected Player:</h3>
            <div className="flex items-center mt-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="ml-2">
                <div className="font-medium">{selectedPlayer.name}</div>
                <div className="text-sm text-gray-600 flex items-center">
                  <span>{formatPrice(selectedPlayer.basePrice)}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{selectedPlayer.rating}/10</span>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <div className={`px-2 py-1 rounded-full text-xs font-medium 
                  ${selectedPlayer.status === 'available' ? 'bg-green-100 text-green-800' : 
                    selectedPlayer.status === 'sold' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'}`}
                >
                  {selectedPlayer.status.charAt(0).toUpperCase() + selectedPlayer.status.slice(1)}
                </div>
              </div>
            </div>
          </div>
          
          {selectedPlayer.status === 'available' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Team</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(teams).map(team => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bid Amount (Lakhs)</label>
                  <Input
                    type="number"
                    min={selectedPlayer.basePrice}
                    step="5"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Min ${selectedPlayer.basePrice}L`}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  className="flex-1 btn-admin"
                  onClick={handleAssignPlayer}
                  disabled={!selectedTeam || !bidAmount}
                >
                  Assign Player
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-600"
                  onClick={handleMarkUnsold}
                >
                  Mark Unsold
                </Button>
              </div>
            </div>
          )}
          
          {selectedPlayer.status === 'sold' && selectedPlayer.soldTo && (
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">Sold to:</span>
                    <span className="ml-1 font-medium">{selectedPlayer.soldTo}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="ml-1 font-medium">{selectedPlayer.soldPrice ? formatPrice(selectedPlayer.soldPrice) : '-'}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleRemovePlayer}
              >
                Remove from {selectedPlayer.soldTo}
              </Button>
            </div>
          )}
          
          {selectedPlayer.status === 'unsold' && (
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-center text-red-800">
                  This player has been marked as unsold
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Team</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(teams).map(team => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bid Amount (Lakhs)</label>
                  <Input
                    type="number"
                    min={selectedPlayer.basePrice}
                    step="5"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Min ${selectedPlayer.basePrice}L`}
                    className="input-field"
                  />
                </div>
              </div>
              
              <Button
                className="w-full btn-admin"
                onClick={handleAssignPlayer}
                disabled={!selectedTeam || !bidAmount}
              >
                Assign Player
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          Select a player to perform actions
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={undoLastAssignment}
        >
          <Undo size={16} className="mr-2" />
          Undo Last Action
        </Button>
      </div>
    </div>
  );
};

export default AuctionActions;
