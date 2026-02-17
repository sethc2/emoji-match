import React from 'react';

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#F4B942]/20 p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4 animate-bounce-in">🃏</div>
        <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">
          Emoji Match
        </h1>
        <p className="text-[#1A1A2E]/60 mb-8 text-lg">
          Flip cards, find pairs, beat your friends!
        </p>

        <div className="bg-[#FEF9EF] rounded-2xl p-4 mb-8 text-left space-y-2">
          <h3 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wide">How to Play</h3>
          <ul className="text-sm text-[#1A1A2E]/70 space-y-1">
            <li>🎯 Tap two cards to flip them over</li>
            <li>✨ If they match, you score a point and go again</li>
            <li>🔄 If not, it's the next player's turn</li>
            <li>🏆 Most pairs wins!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#F4B942] to-[#D4941C] text-[#1A1A2E] font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
        >
          Let's Play!
        </button>
      </div>
    </div>
  );
}
