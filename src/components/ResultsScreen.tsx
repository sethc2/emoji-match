import React from 'react';
import { Player } from '../hooks/useGameState';
import { PLAYER_COLORS } from './PlayerCorner';

interface ResultsScreenProps {
  players: Player[];
  onPlayAgain: () => void;
  onHome: () => void;
}

export function ResultsScreen({ players, onPlayAgain, onHome }: ResultsScreenProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const highScore = sorted[0].score;
  const winners = sorted.filter(p => p.score === highScore);
  const isTie = winners.length > 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#F4B942]/20 p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4 animate-bounce-in">🏆</div>
        <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">
          {isTie ? "It's a Tie!" : `${winners[0].name} Wins!`}
        </h2>
        <p className="text-[#1A1A2E]/50 mb-6">
          {isTie
            ? `${winners.map(w => w.name).join(' & ')} tied with ${highScore} pairs each!`
            : `with ${highScore} pairs!`
          }
        </p>

        {/* Scoreboard */}
        <div className="space-y-3 mb-8">
          {sorted.map((player, index) => {
            const originalIndex = players.indexOf(player);
            const colors = PLAYER_COLORS[originalIndex];
            const isWinner = player.score === highScore;
            return (
              <div
                key={player.name}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                  isWinner ? `${colors.light} ${colors.border} border-2` : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-[#1A1A2E]/30">
                    {index + 1}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
                  <span className={`font-semibold ${isWinner ? colors.text : 'text-gray-500'}`}>
                    {player.name}
                  </span>
                </div>
                <span className={`text-2xl font-bold ${isWinner ? colors.text : 'text-gray-400'}`}>
                  {player.score}
                </span>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#F4B942] to-[#D4941C] text-[#1A1A2E] font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            Play Again
          </button>
          <button
            onClick={onHome}
            className="w-full h-12 rounded-2xl bg-white border-2 border-[#F4B942]/30 text-[#1A1A2E]/60 font-semibold hover:border-[#F4B942] transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
