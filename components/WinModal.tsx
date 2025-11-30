
import React, { useEffect } from 'react';
import { Icons } from './Icons';
import { speakWin } from '../utils/sound';

interface WinModalProps {
  score: number;
  moves: number;
  onRestart: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({ score, moves, onRestart }) => {
  useEffect(() => {
    // Play win speech when modal appears
    // Slight delay to ensure it doesn't conflict immediately with previous sounds
    const timer = setTimeout(() => {
      speakWin();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl border-4 border-[#FFD93D] transform animate-pop relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFE66D]/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF6B6B]/20 rounded-full blur-2xl"></div>

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-24 h-24 bg-[#FFE66D] rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-white">
            <Icons.Star className="w-12 h-12 text-white fill-current animate-bounce-sm" />
          </div>
          
          <h2 className="text-4xl font-display font-bold text-[#4ECDC4] mb-2 drop-shadow-sm">YOU WON!</h2>
          <p className="text-slate-500 font-medium mb-8">Great Job, Super Star!</p>
          
          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Score</span>
                <span className="text-2xl font-bold text-slate-700">{score}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Moves</span>
                <span className="text-2xl font-bold text-slate-700">{moves}</span>
            </div>
          </div>

          <button 
            onClick={onRestart}
            className="w-full py-4 bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-200 transition-transform active:scale-95 border-b-4 border-[#E04848]"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
