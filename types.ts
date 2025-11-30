
export interface GameColor {
  name: string;
  hex: string;
}

export interface Card {
  id: string;
  color: GameColor;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  moves: number;
  isGameOver: boolean;
  isLocked: boolean; // Prevent clicks during animations
}

export enum ColorRole {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACCENT = 'accent',
  BACKGROUND = 'background',
  SURFACE = 'surface',
  TEXT_MAIN = 'text_main',
  TEXT_MUTED = 'text_muted',
}

export interface ColorItem {
  hex: string;
  name: string;
  role: ColorRole;
  description: string;
}

export interface Palette {
  id: string;
  name: string;
  description: string;
  colors: ColorItem[];
  createdAt: number;
}

export type PreviewType = 'dashboard' | 'landing' | 'mobile';
