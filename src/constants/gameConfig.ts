// Game Configuration Constants
// Modify these values to customize the game experience

export const GAME_CONFIG = {
  // Timer durations (in seconds)
  HINT_DURATION: 5,
  GAME_DURATION: 50,

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
  '#98D8C8', // Mint
  '#F7DC6F', // Gold
  '#BB8FCE', // Lavender
  '#85C1E9', // Sky Blue
  '#F8C471', // Orange
  '#82E0AA', // Light Green
  '#F1948A', // Coral
  '#AED6F1', // Light Blue
  '#D7BDE2', // Light Purple
  '#A3E4D7', // Turquoise
  '#F9E79F', // Light Yellow
  '#D5A6BD', // Mauve
  '#A9DFBF', // Pale Green
  '#FADBD8', // Pink
] as const;
