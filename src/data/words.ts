import type { WordData } from '../types/game';

export const WORD_DATABASE: WordData[] = [
  // Easy words
  {
    word: 'ELEPHANT',
    hint: 'Large gray mammal with a trunk',
    options: ['ELEPHANT', 'KANGAROO', 'HEDGEHOG', 'ANTELOPE'],
    correctAnswer: 'ELEPHANT',
    difficulty: 'easy'
  },
  {
    word: 'RAINBOW',
    hint: 'Colorful arc in the sky after rain',
    options: ['RAINBOW', 'TORNADO', 'CYCLONE', 'TYPHOON'],
    correctAnswer: 'RAINBOW',
    difficulty: 'easy'
  },
  {
    word: 'BUTTERFLY',
    hint: 'Colorful insect that transforms from a caterpillar',
    options: ['BUTTERFLY', 'DRAGONFLY', 'CENTIPEDE', 'COCKROACH'], // Kept as these are good distractors of same length
    correctAnswer: 'BUTTERFLY',
    difficulty: 'easy'
  },
  {
    word: 'PIZZA',
    hint: 'Round Italian dish with cheese and toppings',
    options: ['PIZZA', 'PASTA', 'BREAD', 'SALAD'], // Kept as these are good distractors of same length
    correctAnswer: 'PIZZA',
    difficulty: 'easy'
  },
  {
    word: 'GUITAR',
    hint: 'Six-stringed musical instrument',
    options: ['GUITAR', 'SITAR', 'ZITHER', 'FIDDLE'],
    correctAnswer: 'GUITAR',
    difficulty: 'easy'
  },
  {
    word: 'CASTLE',
    hint: 'Medieval fortress where kings and queens lived',
    options: ['CASTLE', 'PALACE', 'TEMPLE', 'CHURCH'], // Kept as these are good distractors of same length
    correctAnswer: 'CASTLE',
    difficulty: 'easy'
  },
  {
    word: 'BICYCLE',
    hint: 'Two-wheeled vehicle powered by pedaling',
    options: ['BICYCLE', 'VEHICLE', 'ARTICLE', 'MIRACLE'],
    correctAnswer: 'BICYCLE',
    difficulty: 'easy'
  },
  {
    word: 'OCEAN',
    hint: 'Large body of salt water',
    options: ['OCEAN', 'RIVER', 'INLET', 'FJORD'],
    correctAnswer: 'OCEAN',
    difficulty: 'easy'
  },
  {
    word: 'CHOCOLATE',
    hint: 'Sweet brown treat made from cacao beans',
    options: ['CHOCOLATE', 'ELIMINATE', 'AGGREGATE', 'DUPLICATE'],
    correctAnswer: 'CHOCOLATE',
    difficulty: 'easy'
  },
  {
    word: 'COMPUTER',
    hint: 'Electronic device for storing and processing data',
    options: ['COMPUTER', 'COMMUTER', 'CONSUMER', 'COMPOSER'],
    correctAnswer: 'COMPUTER',
    difficulty: 'easy'
  },

  // Medium words
  {
    word: 'TELESCOPE',
    hint: 'Instrument used to observe distant objects in space',
    options: ['TELESCOPE', 'MICROSCOPE', 'PERISCOPE', 'HOROSCOPE'],
    correctAnswer: 'TELESCOPE',
    difficulty: 'medium'
  },
  {
    word: 'DEMOCRACY',
    hint: 'Government system where people vote for their leaders',
    options: ['DEMOCRACY', 'THEOCRACY', 'AUTOCRACY', 'OLIGARCHY'],
    correctAnswer: 'DEMOCRACY',
    difficulty: 'medium'
  },
  {
    word: 'PHOTOSYNTHESIS',
    hint: 'Process by which plants make food using sunlight',
    options: ['PHOTOSYNTHESIS', 'METAMORPHOSIS', 'ELECTROLYSIS', 'PSYCHOANALYSIS'],
    correctAnswer: 'PHOTOSYNTHESIS',
    difficulty: 'medium'
  },
  {
    word: 'ARCHAEOLOGY',
    hint: 'Study of human history through excavation of artifacts',
    options: ['ARCHAEOLOGY', 'ANTHROPOLOGY', 'METEOROLOGY', 'CRIMINOLOGY'],
    correctAnswer: 'ARCHAEOLOGY',
    difficulty: 'medium'
  },
  {
    word: 'SYMPHONY',
    hint: 'Large-scale musical composition for orchestra',
    options: ['SYMPHONY', 'CACOPHONY', 'POLYPHONY', 'MONOTONY'],
    correctAnswer: 'SYMPHONY',
    difficulty: 'medium'
  },
  {
    word: 'METAMORPHOSIS',
    hint: 'Complete transformation of form during development',
    options: ['METAMORPHOSIS', 'PHOTOSYNTHESIS', 'ELECTROLYSIS', 'PSYCHOANALYSIS'],
    correctAnswer: 'METAMORPHOSIS',
    difficulty: 'medium'
  },
  {
    word: 'CONSTELLATION',
    hint: 'Group of stars forming a recognizable pattern',
    options: ['CONSTELLATION', 'CONFIGURATION', 'DEMONSTRATION', 'CONCENTRATION'], // Kept as these are excellent distractors
    correctAnswer: 'CONSTELLATION',
    difficulty: 'medium'
  },
  {
    word: 'ENTREPRENEUR',
    hint: 'Person who starts and runs their own business',
    options: ['ENTREPRENEUR', 'MANUFACTURER', 'RESTAURATEUR', 'PROVOCATEUR'],
    correctAnswer: 'ENTREPRENEUR',
    difficulty: 'medium'
  },
  {
    word: 'HIERARCHY',
    hint: 'A system in which members are ranked according to status',
    options: ['HIERARCHY', 'MONARCHY', 'PATRIARCHY', 'OLIGARCHY'],
    correctAnswer: 'HIERARCHY',
    difficulty: 'medium'
  },
  {
    word: 'HYPOTHESIS',
    hint: 'A proposed explanation made on the basis of limited evidence',
    options: ['HYPOTHESIS', 'SYNTHESIS', 'ANALYSIS', 'PARENTHESIS'],
    correctAnswer: 'HYPOTHESIS',
    difficulty: 'medium'
  },

  // Hard words
  {
    word: 'SERENDIPITY',
    hint: 'Pleasant surprise or fortunate accident',
    options: ['SERENDIPITY', 'TRANQUILITY', 'PERSONALITY', 'HOSPITALITY'], // Kept as these are excellent distractors
    correctAnswer: 'SERENDIPITY',
    difficulty: 'hard'
  },
  {
    word: 'QUINTESSENTIAL',
    hint: 'Representing the most perfect example of a quality',
    options: ['QUINTESSENTIAL', 'TRANSCENDENTAL', 'ENVIRONMENTAL', 'CONSEQUENTIAL'],
    correctAnswer: 'QUINTESSENTIAL',
    difficulty: 'hard'
  },
  {
    word: 'PERSPICACIOUS',
    hint: 'Having keen insight and understanding',
    options: ['PERSPICACIOUS', 'CONTUMACIOUS', 'EFFICACIOUS', 'FALLACIOUS'],
    correctAnswer: 'PERSPICACIOUS',
    difficulty: 'hard'
  },
  {
    word: 'EPHEMERAL',
    hint: 'Lasting for a very short time',
    options: ['EPHEMERAL', 'BACTERIAL', 'NUMERICAL', 'SPHERICAL'],
    correctAnswer: 'EPHEMERAL',
    difficulty: 'hard'
  },
  {
    word: 'UBIQUITOUS',
    hint: 'Present, appearing, or found everywhere',
    options: ['UBIQUITOUS', 'PROMISCUOUS', 'CONTINUOUS', 'INDIGENOUS'],
    correctAnswer: 'UBIQUITOUS',
    difficulty: 'hard'
  },
  {
    word: 'CACOPHONY',
    hint: 'Harsh, discordant mixture of sounds',
    options: ['CACOPHONY', 'TELEPHONY', 'SYMPHONY', 'POLYPHONY'],
    correctAnswer: 'CACOPHONY',
    difficulty: 'hard'
  },
  {
    word: 'SURREPTITIOUS',
    hint: 'Done secretly or stealthily',
    options: ['SURREPTITIOUS', 'SUPERSTITIOUS', 'ADVENTITIOUS', 'PROPITIOUS'],
    correctAnswer: 'SURREPTITIOUS',
    difficulty: 'hard'
  },
  {
    word: 'MAGNANIMOUS',
    hint: 'Very generous or forgiving, especially toward a rival',
    options: ['MAGNANIMOUS', 'UNANIMOUS', 'PUSILLANIMOUS', 'SYNONYMOUS'],
    correctAnswer: 'MAGNANIMOUS',
    difficulty: 'hard'
  },
  {
    word: 'ONOMATOPOEIA',
    hint: 'A word that imitates a sound',
    options: ['ONOMATOPOEIA', 'PROSOPOPOEIA', 'PHARMACOPOEIA', 'MYTHOPOEIA'],
    correctAnswer: 'ONOMATOPOEIA',
    difficulty: 'hard'
  },
  {
    word: 'PULCHRITUDINOUS',
    hint: 'Having great physical beauty',
    options: ['PULCHRITUDINOUS', 'MULTITUDINOUS', 'LATITUDINOUS', 'ALTITUDINOUS'],
    correctAnswer: 'PULCHRITUDINOUS',
    difficulty: 'hard'
  }
];

export function getWordsByDifficulty(difficulty: 'easy' | 'medium' | 'hard', count: number): WordData[] {
  const filteredWords = WORD_DATABASE.filter(word => word.difficulty === difficulty);
  const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getUniqueWordsForTeams(difficulty: 'easy' | 'medium' | 'hard', wordsPerTeam: number, teamCount: number): WordData[] {
  const filteredWords = WORD_DATABASE.filter(word => word.difficulty === difficulty);
  const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
  const totalWordsNeeded = wordsPerTeam * teamCount;
  
  // If we don't have enough unique words, repeat the shuffled array
  const words: WordData[] = [];
  for (let i = 0; i < totalWordsNeeded; i++) {
    words.push(shuffled[i % shuffled.length]);
  }
  
  return words;
}

export function createMaskedWord(word: string): string {
  const length = word.length;
  const visibleCount = Math.max(1, Math.floor(length * 0.3)); // Show 30% of letters
  const positions = new Set<number>();
  
  // Always show first letter
  positions.add(0);
  
  // Randomly select other positions
  while (positions.size < visibleCount) {
    positions.add(Math.floor(Math.random() * length));
  }
  
  return word
    .split('')
    .map((letter, index) => positions.has(index) ? letter : '_')
    .join(' ');
}