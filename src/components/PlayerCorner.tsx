import React from 'react';
import { Player } from '../hooks/useGameState';

interface PlayerCornerProps {
  player: Player;
  playerIndex: number;
  isActive: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const PLAYER_COLORS = [
  { bg: 'bg-blue-500', light: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700' },
  { bg: 'bg-rose-500', light: 'bg-rose-100', border: 'border-rose-400', text: 'text-rose-700' },
  { bg: 'bg-emerald-500', light: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-700' },
  { bg: 'bg-violet-500', light: 'bg-violet-100', border: 'border-violet-400', text: 'text-violet-700' },
];

const positionClasses = {
  'top-left': 'rounded-br-2xl rounded-tl-none',
  'top-right': 'rounded-bl-2xl rounded-tr-none',
  'bottom-left': 'rounded-tr-2xl rounded-bl-none',
  'bottom-right': 'rounded-tl-2xl rounded-br-none',
};

export function PlayerCorner({ player, playerIndex, isActive, position }: PlayerCornerProps) {
  const colors = PLAYER_COLORS[playerIndex];

  return (
    <div
      className={`
        px-3 py-2 transition-all duration-300
        ${positionClasses[position]}
        ${isActive
          ? `${colors.light} ${colors.border} border-2 animate-pulse-glow shadow-lg`
          : 'bg-white/60 border border-gray-200'
        }
      `}
    >
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isActive ? colors.bg : 'bg-gray-300'}`} />
        <span className={`text-sm font-semibold ${isActive ? colors.text : 'text-gray-400'}`}>
          {player.name}
        </span>
      </div>
      <div className={`text-2xl font-bold ${isActive ? colors.text : 'text-gray-400'}`}>
        {player.score}
      </div>
    </div>
  );
}

export { PLAYER_COLORS };
