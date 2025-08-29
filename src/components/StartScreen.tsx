import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Team, GameSettings, AnswerMode } from '../types/game';
import { TEAM_COLORS } from '../types/game';
import { GAME_CONFIG } from '../constants/gameConfig';

interface StartScreenProps {
  onStartGame: (settings: GameSettings) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [numberOfWords, setNumberOfWords] = useState<number>(GAME_CONFIG.WORDS_PER_GAME);
  const [answerMode, setAnswerMode] = useState<AnswerMode>('text');

  const addTeam = () => {
    if (newTeamName.trim() && teams.length < 20) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
        score: 0,
        color: TEAM_COLORS[teams.length % TEAM_COLORS.length]
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
    }
  };

  const removeTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const handleStartGame = () => {
    if (teams.length >= 2) {
      const settings: GameSettings = {
        difficulty,
        numberOfWords,
        teams,
        answerMode
      };
      onStartGame(settings);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTeam();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 funky-text mb-4">
            Word Guess Game! 🎯
          </h1>
          <p className="text-gray-600 text-lg classic-text">
            Test your vocabulary skills in this exciting team-based word guessing game!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Team Setup */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 funky-text">
              Add Teams 👥
            </h2>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter team name..."
                className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg funky-text"
                maxLength={20}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTeam}
                disabled={!newTeamName.trim() || teams.length >= 20}
                className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
              >
                Add
              </motion.button>
            </div>

            <div className="text-sm text-gray-500">
              {teams.length}/20 teams • Minimum 2 teams required
            </div>

            {/* Teams List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <AnimatePresence>
                {teams.map((team) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: team.color }}
                      />
                      <span className="font-semibold text-gray-800 funky-text">
                        {team.name}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeTeam(team.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                    >
                      ×
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Game Settings */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 funky-text">
              Game Settings ⚙️
            </h2>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3 classic-text">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDifficulty(level)}
                    className={`p-3 rounded-xl font-bold capitalize transition-all ${
                      difficulty === level
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {difficulty === 'easy' && '🟢 Simple words, perfect for beginners'}
                {difficulty === 'medium' && '🟡 Moderate challenge, good vocabulary needed'}
                {difficulty === 'hard' && '🔴 Advanced words, for word masters!'}
              </div>
            </div>

            {/* Number of Words */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3 classic-text">
                Number of Words: {numberOfWords}
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={numberOfWords}
                onChange={(e) => setNumberOfWords(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 word</span>
                <span>15 words</span>
              </div>
            </div>

            {/* Game Mode */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3 classic-text">
                Game Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['text', 'tiles', 'voice'] as const).map((mode) => (
                  <motion.button
                    key={mode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAnswerMode(mode)}
                    className={`p-3 rounded-xl font-bold capitalize transition-all ${
                      answerMode === mode
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {mode}
                  </motion.button>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {answerMode === 'text' && 'Keyboard typing + Enter to submit'}
                {answerMode === 'tiles' && 'Per-letter boxes; paste to fill quickly'}
                {answerMode === 'voice' && 'Speak your guess via microphone'}
              </div>
            </div>

            {/* Game Rules */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-bold text-blue-800 mb-2 funky-text">Game Rules 📋</h3>
              <ul className="text-sm text-blue-700 space-y-1 classic-text">
                <li>• Teams take turns guessing words</li>
                <li>• Hints appear for {GAME_CONFIG.HINT_DURATION} seconds only</li>
                <li>• Correct answers earn {GAME_CONFIG.POINTS_PER_CORRECT_ANSWER} points</li>
                <li>• Choose an input mode: text, tiles, or voice</li>
                <li>• Highest score wins!</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Start Game Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartGame}
            disabled={teams.length < 2}
            className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all ${
              teams.length >= 2
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {teams.length < 2 ? 'Add at least 2 teams to start' : 'Start Game! 🚀'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
