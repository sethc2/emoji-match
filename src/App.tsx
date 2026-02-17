import React from 'react';
import { useGameState } from './hooks/useGameState';
import { HomeScreen } from './components/HomeScreen';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

function App() {
  const game = useGameState();

  switch (game.screen) {
    case 'home':
      return <HomeScreen onStart={() => game.setScreen('setup')} />;
    case 'setup':
      return (
        <SetupScreen
          onStart={game.startGame}
          onBack={() => game.setScreen('home')}
        />
      );
    case 'game':
      return (
        <GameScreen
          cards={game.cards}
          players={game.players}
          currentPlayerIndex={game.currentPlayerIndex}
          lastMatchResult={game.lastMatchResult}
          onFlipCard={game.flipCard}
        />
      );
    case 'results':
      return (
        <ResultsScreen
          players={game.players}
          onPlayAgain={game.playAgain}
          onHome={game.resetGame}
        />
      );
  }
}

export default App;
