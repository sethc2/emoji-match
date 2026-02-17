import React from 'react';
import { Card } from './Card';
import { PlayerCorner } from './PlayerCorner';
import { CardState, Player } from '../hooks/useGameState';

interface GameScreenProps {
  cards: CardState[];
  players: Player[];
  currentPlayerIndex: number;
  lastMatchResult: 'match' | 'no-match' | null;
  onFlipCard: (index: number) => void;
}

function getGridCols(totalCards: number): { cols: number; size: 'sm' | 'md' | 'lg' } {
  if (totalCards <= 16) return { cols: 3, size: 'lg' };
  if (totalCards <= 24) return { cols: 4, size: 'md' };
  if (totalCards <= 30) return { cols: 4, size: 'md' };
  return { cols: 5, size: 'sm' };
}

export function GameScreen({ cards, players, currentPlayerIndex, lastMatchResult, onFlipCard }: GameScreenProps) {
  const { cols, size } = getGridCols(cards.length);
  const matched = cards.filter(c => c.isMatched).length;
  const total = cards.length;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Player corners */}
      <div className="absolute top-0 left-0 z-10">
        {players[0] && (
          <PlayerCorner
            player={players[0]}
            playerIndex={0}
            isActive={currentPlayerIndex === 0}
            position="top-left"
          />
        )}
      </div>
      <div className="absolute top-0 right-0 z-10">
        {players[1] && (
          <PlayerCorner
            player={players[1]}
            playerIndex={1}
            isActive={currentPlayerIndex === 1}
            position="top-right"
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 z-10">
        {players[2] && (
          <PlayerCorner
            player={players[2]}
            playerIndex={2}
            isActive={currentPlayerIndex === 2}
            position="bottom-left"
          />
        )}
      </div>
      <div className="absolute bottom-0 right-0 z-10">
        {players[3] && (
          <PlayerCorner
            player={players[3]}
            playerIndex={3}
            isActive={currentPlayerIndex === 3}
            position="bottom-right"
          />
        )}
      </div>

      {/* Status bar */}
      <div className="text-center pt-14 pb-2 px-4">
        <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
          lastMatchResult === 'match'
            ? 'bg-green-100 text-green-700'
            : lastMatchResult === 'no-match'
            ? 'bg-red-100 text-red-700 animate-shake'
            : 'bg-white/60 text-[#1A1A2E]/60'
        }`}>
          {lastMatchResult === 'match'
            ? '✨ Match! Go again!'
            : lastMatchResult === 'no-match'
            ? 'No match...'
            : `${players[currentPlayerIndex]?.name}'s turn`
          }
        </div>
        {/* Progress */}
        <div className="mt-1 text-xs text-[#1A1A2E]/40">
          {matched / 2} / {total / 2} pairs found
        </div>
      </div>

      {/* Card grid */}
      <div className="flex-1 flex items-center justify-center p-4 pb-14">
        <div
          className="grid gap-2 w-full max-w-lg"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => onFlipCard(index)}
              gridSize={size}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
