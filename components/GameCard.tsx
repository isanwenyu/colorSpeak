
import React from 'react';
import { Card } from '../types';

interface GameCardProps {
  card: Card;
  onClick: (card: Card) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ card, onClick }) => {
  return (
    <div 
      className={`relative aspect-square cursor-pointer perspective-1000 transition-transform duration-300 ${card.isFlipped || card.isMatched ? '' : 'hover:scale-105 active:scale-95'}`}
      onClick={() => onClick(card)}
    >
      <div 
        className={`w-full h-full relative preserve-3d transition-all duration-500 shadow-md rounded-3xl ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d', transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Back of Card (Question Mark) - Visible when NOT flipped */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#4ECDC4] rounded-3xl flex items-center justify-center border-b-8 border-[#3dbcb3]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-20" 
              style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '16px 16px' }}>
          </div>
          <span className="text-white text-5xl font-display font-bold relative z-10 drop-shadow-md">?</span>
        </div>

        {/* Front of Card (Color) - Visible when flipped */}
        <div 
          className="absolute inset-0 backface-hidden rounded-3xl flex flex-col items-center justify-center overflow-hidden border-b-8 border-black/10"
          style={{ 
            backgroundColor: card.color.hex, 
            transform: 'rotateY(180deg)', 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
           {/* Glassy overlay for text readability if needed, or simple text */}
           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/10 pointer-events-none"></div>
           
           <h3 className="text-white text-lg sm:text-xl font-bold drop-shadow-lg text-center px-2 z-10 break-words w-full" style={{
             textShadow: '0px 2px 4px rgba(0,0,0,0.3)'
           }}>
             {card.color.name}
           </h3>
        </div>
      </div>
    </div>
  );
};
