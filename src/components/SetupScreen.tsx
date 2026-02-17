import React, { useState } from 'react';
import { GameConfig } from '../hooks/useGameState';

interface SetupScreenProps {
  onStart: (config: GameConfig) => void;
  onBack: () => void;
}

const PAIR_OPTIONS = [8, 10, 12, 15, 20];

export function SetupScreen({ onStart, onBack }: SetupScreenProps) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [numPairs, setNumPairs] = useState(20);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#F4B942]/20 p-8 max-w-md w-full">
        <button
          onClick={onBack}
          className="text-[#D4941C] font-medium mb-4 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8 text-center">
          Game Setup
        </h2>

        {/* Number of Players */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#1A1A2E] uppercase tracking-wide mb-3">
            Players
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setNumPlayers(n)}
                className={`h-14 rounded-2xl font-bold text-lg transition-all duration-200 ${
                  numPlayers === n
                    ? 'bg-gradient-to-r from-[#F4B942] to-[#D4941C] text-[#1A1A2E] shadow-lg scale-105'
                    : 'bg-white border-2 border-[#F4B942]/30 text-[#1A1A2E]/60 hover:border-[#F4B942]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Pairs */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#1A1A2E] uppercase tracking-wide mb-3">
            Cards: {numPairs * 2}
            <span className="font-normal text-[#1A1A2E]/50 ml-1">({numPairs} pairs)</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {PAIR_OPTIONS.map(n => (
              <button
                key={n}
                onClick={() => setNumPairs(n)}
                className={`h-12 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  numPairs === n
                    ? 'bg-gradient-to-r from-[#F4B942] to-[#D4941C] text-[#1A1A2E] shadow-lg scale-105'
                    : 'bg-white border-2 border-[#F4B942]/30 text-[#1A1A2E]/60 hover:border-[#F4B942]'
                }`}
              >
                {n * 2}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStart({ numPlayers, numPairs })}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#F4B942] to-[#D4941C] text-[#1A1A2E] font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
