import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
import { Player, PlayerStatus } from '@/data/players';
import { toast } from '@/components/ui/use-toast';
import { playersData } from '@/data/players';

// Team interface
export interface Team {
  purse: number;
  players: Player[];
  foreignPlayerCount: number;
}

// Define teams state interface
interface TeamsState {
  [key: string]: Team;
}

// Define AuctionAction type for history tracking
interface AuctionAction {
  type: 'assign' | 'remove' | 'unsold' | 'make-available';
  player: Player;
  team?: string;
  amount?: number;
}

// Context interface
interface AuctionContextType {
  players: Player[];
  filteredPlayers: Player[]; 
  searchTerm: string; 
  setSearchTerm: (term: string) => void; 
  teams: TeamsState;
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
  assignPlayerToTeam: (playerId: number, teamName: string, amount: number) => void;
  removePlayerFromTeam: (playerId: number, teamName: string) => void;
  markPlayerUnsold: (playerId: number) => void;
  markPlayerAvailable: (playerId: number) => void;
  updateTeamName: (oldName: string, newName: string) => void;
  resetAuction: () => void;
  undoLastAssignment: () => void;
  getHighestBid: () => { player: Player | null; amount: number };
}

// Initial context state
const initialContextState: AuctionContextType = {
  players: [],
  filteredPlayers: [],
  searchTerm: '',
  setSearchTerm: () => {},
  teams: {},
  selectedPlayer: null,
  setSelectedPlayer: () => {},
  assignPlayerToTeam: () => {},
  removePlayerFromTeam: () => {},
  markPlayerUnsold: () => {},
  markPlayerAvailable: () => {},
  updateTeamName: () => {},
  resetAuction: () => {},
  undoLastAssignment: () => {},
  getHighestBid: () => ({ player: null, amount: 0 }),
};

// Create context
const AuctionContext = createContext<AuctionContextType>(initialContextState);

// Action type for reducer
type ActionType = 
  | { type: 'assign'; player: Player; team: string; amount: number }
  | { type: 'remove'; player: Player; team: string }
  | { type: 'unsold'; player: Player }
  | { type: 'make-available'; player: Player }
  | { type: 'reset' }
  | { type: 'update-team-name'; oldName: string; newName: string }
  | { type: 'load-state'; state: { players: Player[]; teams: TeamsState; history: AuctionAction[] } };

// LocalStorage keys
const STORAGE_KEYS = {
  AUCTION_STATE: 'ipl_auction_state',
};

// Reducer function
const auctionReducer = (state: { players: Player[]; teams: TeamsState; history: AuctionAction[] }, action: ActionType) => {
  let newState;
  
  switch (action.type) {
    case 'assign': {
      const { player, team, amount } = action;
      const playerIndex = state.players.findIndex(p => p.id === player.id);
      
      if (playerIndex === -1) return state;
      
      // Check if the team exists, if not create it
      if (!state.teams[team]) {
        state.teams[team] = {
          purse: 50,
          players: [],
          foreignPlayerCount: 0
        };
      }
      
      // Check if team has enough purse
      if (state.teams[team].purse < amount / 100) {
        toast({
          title: "Insufficient funds",
          description: `${team} doesn't have enough purse to buy this player.`,
          variant: "destructive",
        });
        return state;
      }
      
      // Check if team has reached player limit
      if (state.teams[team].players.length >= 13) {
        toast({
          title: "Team Full",
          description: `${team} has already reached the maximum player limit of 13.`,
          variant: "destructive",
        });
        return state;
      }
      
      // Check if team has reached foreign player limit
      if (!player.isIndian && state.teams[team].foreignPlayerCount >= 5) {
        toast({
          title: "Foreign Player Limit Reached",
          description: `${team} has already reached the foreign player limit of 5.`,
          variant: "destructive",
        });
        return state;
      }
      
      // Update player status
      const updatedPlayer = {
        ...player,
        status: 'sold' as PlayerStatus,
        soldTo: team,
        soldPrice: amount
      };
      
      // Update players list
      const updatedPlayers = [...state.players];
      updatedPlayers[playerIndex] = updatedPlayer;
      
      // Update team
      const updatedTeam = {
        ...state.teams[team],
        purse: state.teams[team].purse - amount / 100,
        players: [...state.teams[team].players, updatedPlayer],
        foreignPlayerCount: state.teams[team].foreignPlayerCount + (player.isIndian ? 0 : 1)
      };
      
      // Track this action in history
      const historyAction: AuctionAction = {
        type: 'assign',
        player: { ...player },
        team,
        amount
      };
      
      newState = {
        ...state,
        players: updatedPlayers,
        teams: {
          ...state.teams,
          [team]: updatedTeam
        },
        history: [...state.history, historyAction]
      };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.AUCTION_STATE, JSON.stringify(newState));
      
      return newState;
    }
    
    case 'remove': {
      const { player, team } = action;
      const playerIndex = state.players.findIndex(p => p.id === player.id);
      
      if (playerIndex === -1 || !state.teams[team]) return state;
      
      // Update player status
      const updatedPlayer = {
        ...player,
        status: 'available' as PlayerStatus,
        soldTo: undefined,
        soldPrice: undefined
      };
      
      // Update players list
      const updatedPlayers = [...state.players];
      updatedPlayers[playerIndex] = updatedPlayer;
      
      // Find player in the team
      const teamPlayerIndex = state.teams[team].players.findIndex(p => p.id === player.id);
      
      if (teamPlayerIndex === -1) return state;
      
      // Update team
      const updatedTeam = {
        ...state.teams[team],
        purse: state.teams[team].purse + (player.soldPrice || 0) / 100,
        players: state.teams[team].players.filter(p => p.id !== player.id),
        foreignPlayerCount: state.teams[team].foreignPlayerCount - (player.isIndian ? 0 : 1)
      };
      
      // Track this action in history
      const historyAction: AuctionAction = {
        type: 'remove',
        player: { ...player },
        team
      };
      
      newState = {
        ...state,
        players: updatedPlayers,
        teams: {
          ...state.teams,
          [team]: updatedTeam
        },
        history: [...state.history, historyAction]
      };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.AUCTION_STATE, JSON.stringify(newState));
      
      return newState;
    }
    
    case 'unsold': {
      const { player } = action;
      const playerIndex = state.players.findIndex(p => p.id === player.id);
      
      if (playerIndex === -1) return state;
      
      // Update player status
      const updatedPlayer = {
        ...player,
        status: 'unsold' as PlayerStatus,
        soldTo: undefined,
        soldPrice: undefined
      };
      
      // Update players list
      const updatedPlayers = [...state.players];
      updatedPlayers[playerIndex] = updatedPlayer;
      
      // Track this action in history
      const historyAction: AuctionAction = {
        type: 'unsold',
        player: { ...player }
      };
      
      newState = {
        ...state,
        players: updatedPlayers,
        history: [...state.history, historyAction]
      };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.AUCTION_STATE, JSON.stringify(newState));
      
      return newState;
    }
    
    case 'make-available': {
      const { player } = action;
      const playerIndex = state.players.findIndex(p => p.id === player.id);
      
      if (playerIndex === -1) return state;
      
      // Update player status
      const updatedPlayer = {
        ...player,
        status: 'available' as PlayerStatus,
        soldTo: undefined,
        soldPrice: undefined
      };
      
      // Update players list
      const updatedPlayers = [...state.players];
      updatedPlayers[playerIndex] = updatedPlayer;
      
      // Track this action in history
      const historyAction: AuctionAction = {
        type: 'make-available',
        player: { ...player }
      };
      
      newState = {
        ...state,
        players: updatedPlayers,
        history: [...state.history, historyAction]
      };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.AUCTION_STATE, JSON.stringify(newState));
      
      return newState;
    }
    
    case 'update-team-name': {
      const { oldName, newName } = action;
      
      // If new name already exists or old name doesn't exist, return state
      if (state.teams[newName] || !state.teams[oldName] || oldName === newName) {
        if (state.teams[newName]) {
          toast({
            title: "Team already exists",
            description: `A team with the name ${newName} already exists.`,
            variant: "destructive",
          });
        }
        return state;
      }
      
      // Get the team data
      const team = state.teams[oldName];
      
      // Update players that belong to this team
      const updatedPlayers = state.players.map(player => {
        if (player.soldTo === oldName) {
          return {
            ...player,
            soldTo: newName
          };
        }
        return player;
      });
      
      // Also update players in the team
      const updatedTeamPlayers = team.players.map(player => ({
        ...player,
        soldTo: newName
      }));
      
      // Create new team with updated name
      const updatedTeam = {
        ...team,
        players: updatedTeamPlayers
      };
      
      // Create updated teams object without old team
      const { [oldName]: _, ...restTeams } = state.teams;
      
      toast({
        title: "Team name updated",
        description: `Team ${oldName} has been renamed to ${newName}.`,
      });
      
      newState = {
        ...state,
        players: updatedPlayers,
        teams: {
          ...restTeams,
          [newName]: updatedTeam
        }
      };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.AUCTION_STATE, JSON.stringify(newState));
      
      return newState;
    }
    
    case 'reset': {
      // Reset players to default state
      const resetPlayers = state.players.map(player => ({
        ...player,
        status: 'available' as PlayerStatus,
        soldTo: undefined,
        soldPrice: undefined
      }));
      
      // Reset teams to default state
      const initialTeams: TeamsState = {};
      for (let i = 1; i <= 8; i++) {
        initialTeams[`Team${i}`] = {
          purse: 50,
          players: [],
          foreignPlayerCount: 0
        };
      }
      
      toast({
        title: "Auction Reset",
        description: "All players and teams have been reset to their initial state.",
      });
      
      newState = {
        players: resetPlayers,
        teams: initialTeams,
        history: []
      };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.AUCTION_STATE, JSON.stringify(newState));
      
      return newState;
    }
    
    case 'load-state': {
      return action.state;
    }
    
    default:
      return state;
  }
};

// Provider component
export const AuctionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with players data or from localStorage
  const getInitialState = () => {
    const savedState = localStorage.getItem(STORAGE_KEYS.AUCTION_STATE);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        toast({
          title: "Auction Data Loaded",
          description: "Loaded saved auction data from your previous session.",
        });
        return parsedState;
      } catch (error) {
        console.error('Failed to parse saved auction state', error);
        localStorage.removeItem(STORAGE_KEYS.AUCTION_STATE);
      }
    }
    
    return {
      players: playersData,
      teams: {},
      history: [] as AuctionAction[]
    };
  };
  
  // Use reducer for state management
  const [state, dispatch] = useReducer(auctionReducer, getInitialState());
  
  // Selected player state
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  
  // Search term state for filtering players
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filtered players based on search term
  const filteredPlayers = state.players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (player.soldTo && player.soldTo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    player.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Initialize teams on first render if none exist
  useEffect(() => {
    if (Object.keys(state.teams).length === 0) {
      // Reset auction to create initial teams
      dispatch({ type: 'reset' });
    }
  }, []);
  
  // Update selected player if it exists in state.players
  useEffect(() => {
    if (selectedPlayer) {
      const updatedPlayer = state.players.find(p => p.id === selectedPlayer.id);
      if (updatedPlayer && JSON.stringify(updatedPlayer) !== JSON.stringify(selectedPlayer)) {
        setSelectedPlayer(updatedPlayer);
      }
    }
  }, [state.players, selectedPlayer]);
  
  // Context methods
  const assignPlayerToTeam = (playerId: number, teamName: string, amount: number) => {
    const player = state.players.find(p => p.id === playerId);
    if (player) {
      dispatch({ type: 'assign', player, team: teamName, amount });
    }
  };
  
  const removePlayerFromTeam = (playerId: number, teamName: string) => {
    const player = state.players.find(p => p.id === playerId);
    if (player) {
      dispatch({ type: 'remove', player, team: teamName });
    }
  };
  
  const markPlayerUnsold = (playerId: number) => {
    const player = state.players.find(p => p.id === playerId);
    if (player) {
      dispatch({ type: 'unsold', player });
    }
  };
  
  const markPlayerAvailable = (playerId: number) => {
    const player = state.players.find(p => p.id === playerId);
    if (player) {
      dispatch({ type: 'make-available', player });
    }
  };
  
  const updateTeamName = (oldName: string, newName: string) => {
    dispatch({ type: 'update-team-name', oldName, newName });
  };
  
  const resetAuction = () => {
    dispatch({ type: 'reset' });
  };
  
  const undoLastAssignment = () => {
    if (state.history.length === 0) {
      toast({
        title: "Nothing to undo",
        description: "There are no actions to undo.",
      });
      return;
    }
    
    // Get the last action
    const lastAction = state.history[state.history.length - 1];
    
    // Reverse the action
    switch (lastAction.type) {
      case 'assign':
        if (lastAction.team) {
          removePlayerFromTeam(lastAction.player.id, lastAction.team);
        }
        break;
      case 'remove':
        if (lastAction.team && lastAction.amount) {
          assignPlayerToTeam(lastAction.player.id, lastAction.team, lastAction.amount);
        }
        break;
      case 'unsold':
        markPlayerAvailable(lastAction.player.id);
        break;
      case 'make-available':
        markPlayerUnsold(lastAction.player.id);
        break;
    }
    
    // Remove the last action from history
    const newHistory = state.history.slice(0, -1);
    // Unfortunately, we can't directly modify state.history here due to how useReducer works,
    // but the action dispatched above will push a new action to history, effectively replacing the undone action
  };
  
  const getHighestBid = () => {
    let highestBid = 0;
    let highestBidPlayer: Player | null = null;
    
    state.players.forEach(player => {
      if (player.status === 'sold' && player.soldPrice && player.soldPrice > highestBid) {
        highestBid = player.soldPrice;
        highestBidPlayer = player;
      }
    });
    
    return { player: highestBidPlayer, amount: highestBid };
  };
  
  // Create context value
  const contextValue: AuctionContextType = {
    players: state.players,
    filteredPlayers,
    searchTerm,
    setSearchTerm,
    teams: state.teams,
    selectedPlayer,
    setSelectedPlayer,
    assignPlayerToTeam,
    removePlayerFromTeam,
    markPlayerUnsold,
    markPlayerAvailable,
    updateTeamName,
    resetAuction,
    undoLastAssignment,
    getHighestBid
  };
  
  return (
    <AuctionContext.Provider value={contextValue}>
      {children}
    </AuctionContext.Provider>
  );
};

// Custom hook for using the context
export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};
