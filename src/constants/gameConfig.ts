// Game Configuration Constants
// Modify these values to customize the game experience

export const GAME_CONFIG = {
  // Timer durations (in seconds)
  HINT_DURATION: 5,
  GAME_DURATION: 20,

  // Game settings
  WORDS_PER_GAME: 10,
  MAX_TEAMS: 6,

  // Scoring
  POINTS_PER_CORRECT_ANSWER: 10,
  POINTS_FOR_TIME_UP: 0,

  // Animation settings (in milliseconds)
  LETTER_REVEAL_INTERVAL: 250,
  LETTER_FADE_DURATION: 600,
} as const;

// Team colors for visual distinction
export const TEAM_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
] as const;
