export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

export type AnswerMode = 'text' | 'tiles' | 'voice';

export interface WordData {
  word: string;
  hint: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameState {
  teams: Team[];
  currentTeamIndex: number;
  currentWordIndex: number;
  words: WordData[];
  gamePhase: 'setup' | 'playing' | 'finished';
  showHint: boolean;
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
  answerMode: AnswerMode;
}

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  numberOfWords: number;
  teams: Team[];
  answerMode: AnswerMode;
}

export const TEAM_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
  '#A3E4D7', '#F9E79F', '#D5A6BD', '#AED6F1', '#A9DFBF'
];