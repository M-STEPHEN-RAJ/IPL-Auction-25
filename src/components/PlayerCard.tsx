
import { Player, formatPrice, getRoleImage } from '@/data/players';
import { useAuction } from '@/context/AuctionContext';
import { useAuth } from '@/hooks/useAuth';
import { Plane, X, Star, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PlayerCardProps {
  player: Player;
  onClick?: (player: Player) => void;
  showDetails?: boolean;
}

const PlayerCard = ({ player, onClick, showDetails = false }: PlayerCardProps) => {
  const { isAdmin } = useAuth();
  const { setSelectedPlayer, removePlayerFromTeam, markPlayerAvailable } = useAuction();
  
  const statusColor = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-blue-100 text-blue-800',
    unsold: 'bg-red-100 text-red-800'
  }[player.status];

  const handleClick = () => {
    if (onClick) {
      onClick(player);
    } else {
      setSelectedPlayer(player);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (player.soldTo) {
      removePlayerFromTeam(player.id, player.soldTo);
    }
  };

  const handleMakeAvailable = (e: React.MouseEvent) => {
    e.stopPropagation();
    markPlayerAvailable(player.id);
  };

  // Generate background gradient based on player rating
  const getCardGradient = () => {
    if (player.rating >= 8) {
      return 'bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 border-yellow-300';
    } else if (player.rating >= 6) {
      return 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-blue-300';
    } else if (player.rating >= 4) {
      return 'bg-gradient-to-br from-green-50 via-green-100 to-green-50 border-green-300';
    } else {
      return 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 border-gray-300';
    }
  };

  return (
    <Card 
      className={`player-card ${showDetails ? 'flex flex-col' : 'grid grid-cols-[auto_1fr_auto]'} gap-3 items-center animate-scale-in overflow-hidden ${getCardGradient()}`}
      onClick={handleClick}
    >
      {/* Player Image and Role */}
      <div className="relative">
        <img 
          src={player.image} 
          alt={player.name} 
          className="w-28 h-24 object-cover object-top rounded-full bg-gray-200 border-2 border-white shadow-md"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md text-lg">
          {getRoleImage(player.role)}
        </div>
      </div>
      
      {/* Player Info */}
      <div className={`flex flex-col ${showDetails ? 'w-full mt-3' : ''}`}>
        <h3 className="font-semibold text-ipl-slate">{player.name}</h3>
        <div className="flex items-center text-sm text-gray-600">
          <span>{player.country}</span>
          {!player.isIndian && (
            <Plane className="w-4 h-4 ml-1 text-blue-500 animate-pulse" />
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center mt-1">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="font-medium">{player.rating}</span>
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-2 gap-2 mt-3 w-full">
            <div className="text-sm bg-gray-50 rounded p-1.5">
              <span className="text-gray-500">Role:</span>
              <span className="ml-1 font-medium capitalize">{player.role.replace('_', ' ')}</span>
            </div>
            <div className="text-sm bg-gray-50 rounded p-1.5">
              <span className="text-gray-500">Base Price:</span>
              <span className="ml-1 font-medium">{formatPrice(player.basePrice)}</span>
            </div>
            <div className="text-sm bg-gray-50 rounded p-1.5">
              <span className="text-gray-500">Rating:</span>
              <span className="ml-1 font-medium">{player.rating}/10</span>
            </div>
            {player.status === 'sold' && (
              <>
                <div className="text-sm bg-gray-50 rounded p-1.5">
                  <span className="text-gray-500">Sold To:</span>
                  <span className="ml-1 font-medium">{player.soldTo}</span>
                </div>
                <div className="text-sm bg-gray-50 rounded p-1.5 col-span-2">
                  <span className="text-gray-500">Sold Price:</span>
                  <span className="ml-1 font-medium">{player.soldPrice ? formatPrice(player.soldPrice) : '-'}</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Status Badge and Action Buttons */}
      <div className="flex items-center gap-2">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor} ${showDetails ? 'self-end' : ''} shadow-sm transition-all duration-300 hover:shadow`}>
          {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
        </div>
        
        {isAdmin && player.status === 'sold' && (
          <button 
            onClick={handleRemove}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors shadow-sm hover:shadow"
            title="Remove player from team"
          >
            <X size={14} />
          </button>
        )}

        {isAdmin && player.status === 'unsold' && (
          <button 
            onClick={handleMakeAvailable}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors shadow-sm hover:shadow"
            title="Make player available again"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>
    </Card>
  );
};

export default PlayerCard;
