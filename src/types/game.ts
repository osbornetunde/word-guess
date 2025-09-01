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
