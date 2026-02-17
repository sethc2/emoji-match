import React from 'react';
import { CardState } from '../hooks/useGameState';

interface CardProps {
  card: CardState;
  onClick: () => void;
  gridSize: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-3xl',
  md: 'text-4xl',
  lg: 'text-5xl',
};

export function Card({ card, onClick, gridSize }: CardProps) {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <div
      className="aspect-square cursor-pointer"
      style={{ perspective: '600px' }}
      onClick={onClick}
    >
      <div className={`card-inner ${isRevealed ? 'flipped' : ''} ${card.isMatched ? 'animate-match-pop' : ''}`}>
        {/* Back of card (visible when face-down) */}
        <div className="card-back bg-gradient-to-br from-[#F4B942] to-[#D4941C] shadow-md border-2 border-[#D4941C]/30 hover:shadow-lg hover:scale-[1.03] transition-shadow duration-200">
          <span className="text-white/40 text-2xl font-bold">?</span>
        </div>

        {/* Front of card (visible when flipped) */}
        <div className={`card-front shadow-md border-2 ${
          card.isMatched
            ? 'bg-green-50 border-green-300'
            : 'bg-white border-[#F4B942]/20'
        }`}>
          <span className={sizeClasses[gridSize]}>{card.emoji}</span>
        </div>
      </div>
    </div>
  );
}
