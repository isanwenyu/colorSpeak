
import React, { useState, useEffect } from 'react';
import { Card, Difficulty, GameColor, GameState } from './types';
import { GameCard } from './components/GameCard';
import { WinModal } from './components/WinModal';
import { Icons } from './components/Icons';
import { playFailSound, speakColor } from './utils/sound';

// Predefined colors for the game
const COLORS: GameColor[] = [
  { name: 'Red', hex: '#FF6B6B' },
  { name: 'Blue', hex: '#48DBFB' },
  { name: 'Green', hex: '#1DD1A1' },
  { name: 'Yellow', hex: '#FECA57' },
  { name: 'Purple', hex: '#5F27CD' },
  { name: 'Orange', hex: '#FF9F43' },
  { name: 'Pink', hex: '#FF9FF3' },
  { name: 'Cyan', hex: '#0ABDE3' },
  { name: 'Black', hex: '#576574' }, // Using a nice slate grey for "Black" UI
  { name: 'White', hex: '#C8D6E5' },
  { name: 'Brown', hex: '#834C32' },
  { name: 'Lime', hex: '#BADC58' },
];

const DIFFICULTY_SETTINGS = {
  EASY: { pairs: 3, cols: 'grid-cols-2 sm:grid-cols-3' },
  MEDIUM: { pairs: 6, cols: 'grid-cols-3 sm:grid-cols-4' },
  HARD: { pairs: 9, cols: 'grid-cols-3 sm:grid-cols-6' }, // 18 cards
};

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [score, setScore] = useState(0); // Score state managed separately to persist
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    isGameOver: false,
    isLocked: false,
  });

  // Initialize game
  const initGame = (diff: Difficulty) => {
    const numPairs = DIFFICULTY_SETTINGS[diff].pairs;
    const selectedColors = COLORS.slice(0, numPairs);
    
    // Create pairs
    const cards: Card[] = [];
    selectedColors.forEach(color => {
      cards.push({ id: crypto.randomUUID(), color, isFlipped: false, isMatched: false });
      cards.push({ id: crypto.randomUUID(), color, isFlipped: false, isMatched: false });
    });

    // Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    setGameState({
      cards,
      flippedCards: [],
      moves: 0,
      isGameOver: false,
      isLocked: false,
    });
  };

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty]);

  const handleCardClick = (clickedCard: Card) => {
    if (
      gameState.isLocked || 
      clickedCard.isFlipped || 
      clickedCard.isMatched || 
      gameState.isGameOver
    ) return;

    // Flip the card
    const newCards = gameState.cards.map(c => 
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    
    const newFlipped = [...gameState.flippedCards, clickedCard];

    setGameState(prev => ({
      ...prev,
      cards: newCards,
      flippedCards: newFlipped
    }));

    // If 2 cards are flipped, check for match
    if (newFlipped.length === 2) {
      setGameState(prev => ({ ...prev, isLocked: true, moves: prev.moves + 1 }));
      checkForMatch(newFlipped[0], newFlipped[1], newCards);
    }
  };

  const checkForMatch = (card1: Card, card2: Card, currentCards: Card[]) => {
    const isMatch = card1.color.name === card2.color.name;

    if (isMatch) {
      // Handle Match
      const matchedCards = currentCards.map(c => 
        c.id === card1.id || c.id === card2.id 
          ? { ...c, isMatched: true, isFlipped: true } 
          : c
      );

      // Play audio
      speakColor(card1.color.name);
      
      setScore(prev => prev + 100); // Accumulate score
      
      const allMatched = matchedCards.every(c => c.isMatched);

      if (allMatched) {
        // Game Over
        triggerConfetti();
        setTimeout(() => {
           setGameState(prev => ({
             ...prev,
             cards: matchedCards,
             flippedCards: [],
             isLocked: false,
             isGameOver: true
           }));
        }, 500);
      } else {
        // Continue Game
        setTimeout(() => {
            setGameState(prev => ({
            ...prev,
            cards: matchedCards,
            flippedCards: [],
            isLocked: false
            }));
        }, 1000); // Allow time to see the flip and hear sound
      }

    } else {
      // Handle Mismatch
      playFailSound();
      
      setTimeout(() => {
        const resetCards = currentCards.map(c => 
          c.id === card1.id || c.id === card2.id 
            ? { ...c, isFlipped: false } 
            : c
        );
        
        setGameState(prev => ({
          ...prev,
          cards: resetCards,
          flippedCards: [],
          isLocked: false
        }));
      }, 1000);
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      // launch a few confetti from the left edge
      (window as any).confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      // and launch a few from the right edge
      (window as any).confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const resetTotalGame = () => {
    setScore(0);
    initGame(difficulty);
  };

  return (
    <div className="min-h-screen py-6 px-4 flex flex-col items-center max-w-4xl mx-auto font-sans">
      
      {/* Header Title */}
      <h1 className="text-5xl sm:text-6xl font-display font-bold text-[#FF6B6B] mb-6 drop-shadow-sm tracking-tight text-center">
        ColorSpeak
      </h1>

      {/* Difficulty Selector */}
      <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-200 mb-8 flex">
        {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              difficulty === level 
                ? 'bg-[#FFD93D] text-slate-900 shadow-sm transform scale-105' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-4 sm:gap-8 mb-8 w-full max-w-md justify-center">
        
        {/* Score */}
        <div className="flex flex-col items-center bg-white border-[3px] border-[#4ECDC4] rounded-2xl w-28 py-2 shadow-[0_4px_0_#3dbcb3]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</span>
            <span className="text-3xl font-bold text-[#4ECDC4]">{score}</span>
        </div>

        {/* Reset Button (Full Reset) */}
        <button 
            onClick={resetTotalGame}
            className="w-16 h-16 rounded-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white flex items-center justify-center shadow-[0_4px_0_#E04848] active:translate-y-[4px] active:shadow-none transition-all"
            title="Reset Game & Score"
        >
            <Icons.RefreshCw className="w-8 h-8" strokeWidth={3} />
        </button>

        {/* Moves */}
        <div className="flex flex-col items-center bg-white border-[3px] border-[#FF6B6B] rounded-2xl w-28 py-2 shadow-[0_4px_0_#E04848]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Moves</span>
            <span className="text-3xl font-bold text-[#FF6B6B]">{gameState.moves}</span>
        </div>
      </div>

      {/* Game Grid */}
      <div className={`grid gap-3 sm:gap-4 w-full max-w-2xl mx-auto ${DIFFICULTY_SETTINGS[difficulty].cols}`}>
        {gameState.cards.map((card) => (
            <GameCard 
                key={card.id} 
                card={card} 
                onClick={handleCardClick} 
            />
        ))}
      </div>

      {/* Win Modal */}
      {gameState.isGameOver && (
        <WinModal 
            score={score} 
            moves={gameState.moves} 
            onRestart={() => initGame(difficulty)} 
        />
      )}

      <footer className="mt-12 text-slate-400 text-sm font-medium">
        Mimic of ColorMatch
      </footer>
    </div>
  );
}
