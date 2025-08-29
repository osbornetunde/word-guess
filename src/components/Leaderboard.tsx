import React from 'react';
import { motion } from 'framer-motion';
import type { Team } from '../types/game';

interface LeaderboardProps {
  teams: Team[];
  onPlayAgain: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ teams, onPlayAgain }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  const maxScore = Math.max(...teams.map(team => team.score));

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-400 to-yellow-600';
      case 1: return 'from-gray-300 to-gray-500';
      case 2: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header with winner celebration */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.5 }}
            className="text-8xl mb-4"
          >
            🏆
          </motion.div>
          
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 funky-text mb-4">
            Game Complete!
          </h1>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl mb-6"
          >
            <div className="text-6xl mb-2">🎉</div>
            <h2 className="text-3xl font-bold funky-text mb-2">
              Congratulations!
            </h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: winner.color }}
              />
              <span className="text-2xl font-bold">{winner.name}</span>
            </div>
            <p className="text-xl">
              Winner with {winner.score} points! 🌟
            </p>
          </motion.div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 funky-text">
            Final Leaderboard 📊
          </h3>

          <div className="space-y-4">
            {sortedTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className={`relative overflow-hidden rounded-2xl shadow-lg ${
                  index === 0 ? 'ring-4 ring-yellow-400' : ''
                }`}
              >
                <div className={`bg-gradient-to-r ${getRankColor(index)} p-6`}>
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">
                        {getRankEmoji(index)}
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white"
                          style={{ backgroundColor: team.color }}
                        />
                        <div>
                          <h4 className="text-2xl font-bold funky-text">
                            {team.name}
                          </h4>
                          <p className="text-sm opacity-90">
                            Rank #{index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        {team.score}
                      </div>
                      <div className="text-sm opacity-90">
                        points
                      </div>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${maxScore > 0 ? (team.score / maxScore) * 100 : 0}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                      className="bg-white h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Confetti effect for winner */}
                {index === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          opacity: 0, 
                          scale: 0,
                          x: Math.random() * 100 + '%',
                          y: Math.random() * 100 + '%'
                        }}
                        animate={{ 
                          opacity: [0, 1, 0], 
                          scale: [0, 1, 0],
                          rotate: 360
                        }}
                        transition={{ 
                          delay: 1.5 + Math.random() * 2,
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 3
                        }}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Game Statistics */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gray-50 rounded-2xl p-6 mb-8"
        >
          <h4 className="text-xl font-bold text-gray-800 mb-4 funky-text text-center">
            Game Statistics 📈
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {teams.length}
              </div>
              <div className="text-sm text-gray-600 classic-text">Teams</div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {teams.reduce((sum, team) => sum + team.score, 0)}
              </div>
              <div className="text-sm text-gray-600 classic-text">Total Points</div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(teams.reduce((sum, team) => sum + team.score, 0) / teams.length)}
              </div>
              <div className="text-sm text-gray-600 classic-text">Avg Score</div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">
                {winner.score}
              </div>
              <div className="text-sm text-gray-600 classic-text">High Score</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Play Again 🔄
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            New Game 🎮
          </motion.button>
        </motion.div>

        {/* Fun message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 classic-text text-lg">
            Thanks for playing! 🎉 Hope you had fun testing your vocabulary skills!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};