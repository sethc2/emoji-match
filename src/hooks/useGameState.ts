import { useState, useCallback, useRef } from 'react';
import { EMOJI_POOL } from '../data/emojis';

export type Screen = 'home' | 'setup' | 'game' | 'results';

export interface Player {
  name: string;
  score: number;
}

export interface CardState {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameConfig {
  numPlayers: number;
  numPairs: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCards(numPairs: number): CardState[] {
  const selectedEmojis = shuffleArray(EMOJI_POOL).slice(0, numPairs);
  const pairs = [...selectedEmojis, ...selectedEmojis];
  const shuffled = shuffleArray(pairs);
  return shuffled.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
}

export function useGameState() {
  const [screen, setScreen] = useState<Screen>('home');
  const [config, setConfig] = useState<GameConfig>({ numPlayers: 2, numPairs: 20 });
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastMatchResult, setLastMatchResult] = useState<'match' | 'no-match' | null>(null);
  const matchedCountRef = useRef(0);

  const startGame = useCallback((gameConfig: GameConfig) => {
    setConfig(gameConfig);
    const newPlayers = Array.from({ length: gameConfig.numPlayers }, (_, i) => ({
      name: `Player ${i + 1}`,
      score: 0,
    }));
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
    setCards(createCards(gameConfig.numPairs));
    setFlippedIndices([]);
    setIsChecking(false);
    setLastMatchResult(null);
    matchedCountRef.current = 0;
    setScreen('game');
  }, []);

  const flipCard = useCallback((cardIndex: number) => {
    if (isChecking) return;

    const card = cards[cardIndex];
    if (card.isFlipped || card.isMatched) return;
    if (flippedIndices.length >= 2) return;

    const newFlipped = [...flippedIndices, cardIndex];
    setFlippedIndices(newFlipped);
    setCards(prev => prev.map((c, i) =>
      i === cardIndex ? { ...c, isFlipped: true } : c
    ));

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [first, second] = newFlipped;
      const isMatch = cards[first].emoji === cards[second].emoji;

      setTimeout(() => {
        if (isMatch) {
          setLastMatchResult('match');
          setCards(prev => prev.map((c, i) =>
            i === first || i === second ? { ...c, isMatched: true } : c
          ));
          setPlayers(prev => prev.map((p, i) =>
            i === currentPlayerIndex ? { ...p, score: p.score + 1 } : p
          ));
          matchedCountRef.current += 1;

          if (matchedCountRef.current === config.numPairs) {
            setTimeout(() => setScreen('results'), 800);
          }
        } else {
          setLastMatchResult('no-match');
          setTimeout(() => {
            setCards(prev => prev.map((c, i) =>
              i === first || i === second ? { ...c, isFlipped: false } : c
            ));
            setCurrentPlayerIndex(prev => (prev + 1) % config.numPlayers);
            setLastMatchResult(null);
          }, 600);
        }

        setFlippedIndices([]);
        setIsChecking(false);
      }, 800);
    }
  }, [cards, flippedIndices, isChecking, currentPlayerIndex, config]);

  const resetGame = useCallback(() => {
    setScreen('home');
    setCards([]);
    setPlayers([]);
    setFlippedIndices([]);
    setIsChecking(false);
    setLastMatchResult(null);
    matchedCountRef.current = 0;
  }, []);

  const playAgain = useCallback(() => {
    startGame(config);
  }, [startGame, config]);

  return {
    screen,
    setScreen,
    config,
    players,
    currentPlayerIndex,
    cards,
    lastMatchResult,
    isChecking,
    startGame,
    flipCard,
    resetGame,
    playAgain,
  };
}
