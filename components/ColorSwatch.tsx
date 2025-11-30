import React, { useState } from 'react';
import { ColorItem } from '../types';
import { Icons } from './Icons';

interface ColorSwatchProps {
  color: ColorItem;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate if text should be black or white based on luminance
  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  };

  const textColor = getContrastColor(color.hex);

  return (
    <div 
      className="group relative flex flex-col rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ring-1 ring-white/10"
      onClick={handleCopy}
    >
      <div 
        className="h-32 sm:h-40 w-full flex items-center justify-center relative"
        style={{ backgroundColor: color.hex }}
      >
        <div 
          className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
            {copied ? <Icons.Check className="w-5 h-5 text-green-600" /> : <Icons.Copy className="w-5 h-5 text-slate-900" />}
          </div>
        </div>
        <span className="sr-only">Copy {color.hex}</span>
      </div>
      
      <div className="bg-slate-800 p-4 flex-1 border-t border-slate-700">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold text-white truncate w-3/4" title={color.name}>
            {color.name}
          </h3>
          <span className="text-xs font-mono text-slate-400">{color.hex}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                {color.role.replace('_', ' ')}
            </span>
        </div>
        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {color.description}
        </p>
      </div>
    </div>
  );
};