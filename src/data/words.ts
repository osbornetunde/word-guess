// Check if we're in a test environment
const isTestEnvironment = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

import type { WordData } from '../types/game';

// Use a smaller dataset for testing to avoid memory issues
const TEST_WORD_DATABASE: WordData[] = [
  {
    word: 'TEST',
    hint: 'A trial or examination',
    options: ['TEST', 'TRIAL', 'EXAM', 'QUIZ'],
    correctAnswer: 'TEST',
    difficulty: 'easy'
  },
  {
    word: 'APPLE',
    hint: 'A fruit',
    options: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE'],
    correctAnswer: 'APPLE',
    difficulty: 'easy'
  },
  {
    word: 'HOUSE',
    hint: 'A place to live',
    options: ['HOUSE', 'APARTMENT', 'CABIN', 'TENT'],
    correctAnswer: 'HOUSE',
    difficulty: 'easy'
  },
  {
    word: 'WATER',
    hint: 'Essential for life',
    options: ['WATER', 'JUICE', 'MILK', 'COFFEE'],
    correctAnswer: 'WATER',
    difficulty: 'easy'
  },
  {
    word: 'SUN',
    hint: 'Gives light and heat',
    options: ['SUN', 'MOON', 'STAR', 'PLANET'],
    correctAnswer: 'SUN',
    difficulty: 'easy'
  },
  {
    word: 'HARD',
    hint: 'Difficult or solid',
    options: ['HARD', 'SOFT', 'EASY', 'FIRM'],
    correctAnswer: 'HARD',
    difficulty: 'medium'
  },
  {
    word: 'COMPUTER',
    hint: 'Electronic device',
    options: ['COMPUTER', 'PHONE', 'TABLET', 'LAPTOP'],
    correctAnswer: 'COMPUTER',
    difficulty: 'medium'
  },
  {
    word: 'LIBRARY',
    hint: 'Place with books',
    options: ['LIBRARY', 'SCHOOL', 'STORE', 'PARK'],
    correctAnswer: 'LIBRARY',
    difficulty: 'medium'
  },
  {
    word: 'COMPLEX',
    hint: 'Complicated or intricate',
    options: ['COMPLEX', 'SIMPLE', 'EASY', 'BASIC'],
    correctAnswer: 'COMPLEX',
    difficulty: 'hard'
  },
  {
    word: 'PHILOSOPHY',
    hint: 'Study of knowledge',
    options: ['PHILOSOPHY', 'SCIENCE', 'MATH', 'HISTORY'],
    correctAnswer: 'PHILOSOPHY',
    difficulty: 'hard'
  }
];

export const WORD_DATABASE: WordData[] = isTestEnvironment ? TEST_WORD_DATABASE : [
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
    options: ['BUTTERFLY', 'DRAGONFLY', 'CENTIPEDE', 'COCKROACH'],
    correctAnswer: 'BUTTERFLY',
    difficulty: 'easy'
  },
  {
    word: 'PIZZA',
    hint: 'Round Italian dish with cheese and toppings',
    options: ['PIZZA', 'PASTA', 'BREAD', 'SALAD'],
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
    options: ['CASTLE', 'PALACE', 'TEMPLE', 'CHURCH'],
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
  {
    word: 'SUNFLOWER',
    hint: 'Tall yellow flower that follows the sun',
    options: ['SUNFLOWER', 'DAISY', 'ROSE', 'TULIP'],
    correctAnswer: 'SUNFLOWER',
    difficulty: 'easy'
  },
  {
    word: 'BANANA',
    hint: 'Yellow curved fruit that monkeys love',
    options: ['BANANA', 'APPLE', 'ORANGE', 'GRAPE'],
    correctAnswer: 'BANANA',
    difficulty: 'easy'
  },
  {
    word: 'CAMERA',
    hint: 'Device used to take photographs',
    options: ['CAMERA', 'RADIO', 'PHONE', 'CLOCK'],
    correctAnswer: 'CAMERA',
    difficulty: 'easy'
  },
  {
    word: 'DIAMOND',
    hint: 'Precious gemstone that is the hardest mineral',
    options: ['DIAMOND', 'RUBY', 'EMERALD', 'SAPPHIRE'],
    correctAnswer: 'DIAMOND',
    difficulty: 'easy'
  },
  {
    word: 'FOOTBALL',
    hint: 'Popular sport played with a round ball',
    options: ['FOOTBALL', 'BASKETBALL', 'VOLLEYBALL', 'TENNIS'],
    correctAnswer: 'FOOTBALL',
    difficulty: 'easy'
  },
  {
    word: 'HAMBURGER',
    hint: 'Popular fast food sandwich with beef patty',
    options: ['HAMBURGER', 'HOTDOG', 'SANDWICH', 'BURGER'],
    correctAnswer: 'HAMBURGER',
    difficulty: 'easy'
  },
  {
    word: 'IGLOO',
    hint: 'Snow house built by Eskimos',
    options: ['IGLOO', 'TENT', 'CABIN', 'HUT'],
    correctAnswer: 'IGLOO',
    difficulty: 'easy'
  },
  {
    word: 'JELLYFISH',
    hint: 'Sea creature with a bell-shaped body and tentacles',
    options: ['JELLYFISH', 'OCTOPUS', 'SQUID', 'STARFISH'],
    correctAnswer: 'JELLYFISH',
    difficulty: 'easy'
  },
  {
    word: 'KANGAROO',
    hint: 'Australian marsupial that hops on two legs',
    options: ['KANGAROO', 'KOALA', 'WOMBAT', 'PLATYPUS'],
    correctAnswer: 'KANGAROO',
    difficulty: 'easy'
  },
  {
    word: 'LIGHTNING',
    hint: 'Bright flash of electricity during a storm',
    options: ['LIGHTNING', 'THUNDER', 'RAIN', 'WIND'],
    correctAnswer: 'LIGHTNING',
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
  {
    word: 'CHLOROPHYLL',
    hint: 'Green pigment in plants that captures sunlight',
    options: ['CHLOROPHYLL', 'CARBOHYDRATE', 'PROTEIN', 'FAT'],
    correctAnswer: 'CHLOROPHYLL',
    difficulty: 'medium'
  },
  {
    word: 'CRYSTALLINE',
    hint: 'Having the structure and form of a crystal',
    options: ['CRYSTALLINE', 'CRYSTAL', 'CRYSTALIZE', 'CRYSTALLOID'],
    correctAnswer: 'CRYSTALLINE',
    difficulty: 'medium'
  },
  {
    word: 'EQUILIBRIUM',
    hint: 'State of balance between opposing forces',
    options: ['EQUILIBRIUM', 'EQUILATERAL', 'EQUIVALENT', 'EQUANIMITY'],
    correctAnswer: 'EQUILIBRIUM',
    difficulty: 'medium'
  },
  {
    word: 'INFINITESIMAL',
    hint: 'Extremely small or negligible',
    options: ['INFINITESIMAL', 'INFINITE', 'INFINITY', 'INFINITIVE'],
    correctAnswer: 'INFINITESIMAL',
    difficulty: 'medium'
  },
  {
    word: 'LABYRINTHINE',
    hint: 'Complicated and confusing like a maze',
    options: ['LABYRINTHINE', 'LABYRINTH', 'LABORATORY', 'LABORIOUS'],
    correctAnswer: 'LABYRINTHINE',
    difficulty: 'medium'
  },
  {
    word: 'MICROORGANISM',
    hint: 'Tiny living thing that can only be seen with a microscope',
    options: ['MICROORGANISM', 'MICROSCOPE', 'MICROWAVE', 'MICROPHONE'],
    correctAnswer: 'MICROORGANISM',
    difficulty: 'medium'
  },
  {
    word: 'PARALLELISM',
    hint: 'State of being parallel or the use of parallel structures',
    options: ['PARALLELISM', 'PARALLEL', 'PARALLELOGRAM', 'PARAPHERNALIA'],
    correctAnswer: 'PARALLELISM',
    difficulty: 'medium'
  },
  {
    word: 'QUADRILATERAL',
    hint: 'Geometric shape with four sides',
    options: ['QUADRILATERAL', 'TRIANGLE', 'PENTAGON', 'HEXAGON'],
    correctAnswer: 'QUADRILATERAL',
    difficulty: 'medium'
  },
  {
    word: 'THERMODYNAMICS',
    hint: 'Study of heat and its relation to work and energy',
    options: ['THERMODYNAMICS', 'THERMOMETER', 'THERMOSTAT', 'THERAPY'],
    correctAnswer: 'THERMODYNAMICS',
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
  },
  {
    word: 'ANTIDISESTABLISHMENTARIANISM',
    hint: 'Opposition to the disestablishment of the Church of England',
    options: ['ANTIDISESTABLISHMENTARIANISM', 'ANTIDISESTABLISHMENT', 'ESTABLISHMENT', 'DISMANTLEMENT'],
    correctAnswer: 'ANTIDISESTABLISHMENTARIANISM',
    difficulty: 'hard'
  },
  {
    word: 'CHLOROFORM',
    hint: 'Colorless liquid used as an anesthetic',
    options: ['CHLOROFORM', 'CHLOROPHYLL', 'CHLORINE', 'CHLORIDE'],
    correctAnswer: 'CHLOROFORM',
    difficulty: 'hard'
  },
  {
    word: 'CONNOISSEUR',
    hint: 'An expert judge in matters of taste',
    options: ['CONNOISSEUR', 'CONNOISSEURS', 'CONNAISSANCE', 'CONNAISSEUR'],
    correctAnswer: 'CONNOISSEUR',
    difficulty: 'hard'
  },
  {
    word: 'DIFFERENTIATE',
    hint: 'To make or become different',
    options: ['DIFFERENTIATE', 'DIFFERENTIAL', 'DIFFERENCE', 'DIFFERENT'],
    correctAnswer: 'DIFFERENTIATE',
    difficulty: 'hard'
  },
  {
    word: 'ENTHUSIASTIC',
    hint: 'Having or showing intense excitement or interest',
    options: ['ENTHUSIASTIC', 'ENTHUSIASM', 'ENTHUSIAST', 'ENTHUSIASTS'],
    correctAnswer: 'ENTHUSIASTIC',
    difficulty: 'hard'
  },
  {
    word: 'HETEROGENEOUS',
    hint: 'Diverse in character or content',
    options: ['HETEROGENEOUS', 'HOMOGENEOUS', 'HETEROGENEITY', 'HETEROGENY'],
    correctAnswer: 'HETEROGENEOUS',
    difficulty: 'hard'
  },
  {
    word: 'INCOMPREHENSIBLE',
    hint: 'Impossible to understand or comprehend',
    options: ['INCOMPREHENSIBLE', 'INCOMPREHENSION', 'COMPREHENSIBLE', 'COMPREHENSION'],
    correctAnswer: 'INCOMPREHENSIBLE',
    difficulty: 'hard'
  },
  {
    word: 'MULTIDISCIPLINARY',
    hint: 'Combining or involving several academic disciplines',
    options: ['MULTIDISCIPLINARY', 'MULTIDISCIPLINE', 'DISCIPLINARY', 'INTERDISCIPLINARY'],
    correctAnswer: 'MULTIDISCIPLINARY',
    difficulty: 'hard'
  },
  {
    word: 'PHENOMENOLOGICAL',
    hint: 'Relating to the philosophical study of phenomena',
    options: ['PHENOMENOLOGICAL', 'PHENOMENOLOGY', 'PHENOMENON', 'PHENOMENA'],
    correctAnswer: 'PHENOMENOLOGICAL',
    difficulty: 'hard'
  },
  {
    word: 'QUINCENTENNIAL',
    hint: 'Relating to a 500th anniversary',
    options: ['QUINCENTENNIAL', 'CENTENNIAL', 'MILLENNIAL', 'BICENTENNIAL'],
    correctAnswer: 'QUINCENTENNIAL',
    difficulty: 'hard'
  },
  {
    word: 'SESQUIPEDALIAN',
    hint: 'Using long words; polysyllabic',
    options: ['SESQUIPEDALIAN', 'SESQUIPEDAL', 'PEDAL', 'PEDALIAN'],
    correctAnswer: 'SESQUIPEDALIAN',
    difficulty: 'hard'
  },
  {
    word: 'SUPERCALIFRAGILISTICEXPIALIDOCIOUS',
    hint: 'Extraordinarily good; wonderful (from Mary Poppins)',
    options: ['SUPERCALIFRAGILISTICEXPIALIDOCIOUS', 'SUPERCALIFRAGILISTIC', 'FRAGILISTICEXPIALIDOCIOUS', 'CALIFRAGILISTIC'],
    correctAnswer: 'SUPERCALIFRAGILISTICEXPIALIDOCIOUS',
    difficulty: 'hard'
  },
  {
    word: 'UNCHARACTERISTICALLY',
    hint: 'In a way that is not typical of a particular person or thing',
    options: ['UNCHARACTERISTICALLY', 'CHARACTERISTICALLY', 'CHARACTERISTIC', 'CHARACTERISTICS'],
    correctAnswer: 'UNCHARACTERISTICALLY',
    difficulty: 'hard'
  },
  {
    word: 'VENTRILOQUIST',
    hint: 'A person who can speak without moving their lips',
    options: ['VENTRILOQUIST', 'VENTRILOQUISM', 'VENTRILOQUY', 'VENTRILOQUISM'],
    correctAnswer: 'VENTRILOQUIST',
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
  if (!word) return '';

  const chars = word.split('');
  const nonSpaceIndices: number[] = [];

  // Find all non-space character positions
  chars.forEach((char, index) => {
    if (char !== ' ') {
      nonSpaceIndices.push(index);
    }
  });

  const visibleCount = Math.max(1, Math.floor(nonSpaceIndices.length * 0.3));
  const positions = new Set<number>();

  // Always show first non-space character
  if (nonSpaceIndices.length > 0) {
    positions.add(nonSpaceIndices[0]);
  }

  // Randomly select other non-space positions
  while (positions.size < visibleCount && positions.size < nonSpaceIndices.length) {
    const randomIndex = Math.floor(Math.random() * nonSpaceIndices.length);
    positions.add(nonSpaceIndices[randomIndex]);
  }

  return chars
    .map((letter, index) => letter === ' ' ? ' ' : (positions.has(index) ? letter : '_'))
    .join('');
}
