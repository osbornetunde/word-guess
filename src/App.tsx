import { useState } from "react";
import { GameScreen } from "./components/GameScreen";
import { Leaderboard } from "./components/Leaderboard";
import { StartScreen } from "./components/StartScreen";
import { GAME_CONFIG } from "./constants/gameConfig";
import { getUniqueWordsForTeams } from "./data/words";
import type { GameSettings, GameState } from "./types/game";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    teams: [],
    currentTeamIndex: 0,
    currentWordIndex: 0,
    words: [],
    gamePhase: "setup",
    showHint: false,
    selectedAnswer: null,
    isAnswerCorrect: null,
    answerMode: "text",
  });

  const handleBackToStart = () => {
    setGameState({
      teams: [],
      currentTeamIndex: 0,
      currentWordIndex: 0,
      words: [],
      gamePhase: "setup",
      showHint: false,
      selectedAnswer: null,
      isAnswerCorrect: null,
      answerMode: "text",
    });
  };

  const handleStartGame = (settings: GameSettings) => {
    const words = getUniqueWordsForTeams(
      settings.difficulty,
      settings.numberOfWords,
      settings.teams.length,
    );

    setGameState({
      teams: settings.teams,
      currentTeamIndex: 0,
      currentWordIndex: 0,
      words,
      gamePhase: "playing",
      showHint: false,
      selectedAnswer: null,
      isAnswerCorrect: null,
      answerMode: settings.answerMode,
    });
  };

  const handleAnswerSelected = (answer: string) => {
    const normalize = (s: string) =>
      s
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

    const currentWord = gameState.words[gameState.currentWordIndex];
    const isTimeUp = answer === "";

    // Normalize both guess and correct answer for fair comparison
    const normalizedGuess = normalize(answer);
    const normalizedCorrect = normalize(currentWord.correctAnswer);
    const isCorrect = !isTimeUp && normalizedGuess === normalizedCorrect;

    // Update team score if correct (no points for time up or wrong)
    const updatedTeams = gameState.teams.map((team, index) => {
      if (index === gameState.currentTeamIndex && isCorrect) {
        return {
          ...team,
          score: team.score + GAME_CONFIG.POINTS_PER_CORRECT_ANSWER,
        };
      }
      return team;
    });

    setGameState((prev) => ({
      ...prev,
      teams: updatedTeams,
      selectedAnswer: isTimeUp ? null : answer,
      isAnswerCorrect: isTimeUp ? false : isCorrect,
      showHint: false,
    }));
  };

  const handleNextTurn = () => {
    const nextTeamIndex =
      (gameState.currentTeamIndex + 1) % gameState.teams.length;
    const nextWordIndex = gameState.currentWordIndex + 1;
    const isLastWord = nextWordIndex >= gameState.words.length;

    if (isLastWord) {
      // Game finished
      setGameState((prev) => ({
        ...prev,
        gamePhase: "finished",
      }));
    } else {
      // Next turn - each team gets a different word
      setGameState((prev) => ({
        ...prev,
        currentTeamIndex: nextTeamIndex,
        currentWordIndex: nextWordIndex,
        selectedAnswer: null,
        isAnswerCorrect: null,
        showHint: false,
      }));
    }
  };

  const handlePlayAgain = () => {
    // Reset scores but keep teams and settings
    const resetTeams = gameState.teams.map((team) => ({ ...team, score: 0 }));
    const wordsPerTeam = Math.floor(
      gameState.words.length / gameState.teams.length,
    );
    const words = getUniqueWordsForTeams(
      gameState.words[0]?.difficulty || "easy",
      wordsPerTeam,
      gameState.teams.length,
    );

    setGameState((prev) => ({
      ...prev,
      teams: resetTeams,
      currentTeamIndex: 0,
      currentWordIndex: 0,
      words,
      gamePhase: "playing",
      selectedAnswer: null,
      isAnswerCorrect: null,
      showHint: false,
      answerMode: prev.answerMode,
    }));
  };

  // Render appropriate screen based on game phase
  switch (gameState.gamePhase) {
    case "setup":
      return <StartScreen onStartGame={handleStartGame} />;

    case "playing":
      return (
        <GameScreen
          gameState={gameState}
          onAnswerSelected={handleAnswerSelected}
          onNextTurn={handleNextTurn}
          onBackToStart={handleBackToStart}
        />
      );

    case "finished":
      return (
        <Leaderboard teams={gameState.teams} onPlayAgain={handlePlayAgain} />
      );

    default:
      return <StartScreen onStartGame={handleStartGame} />;
  }
}

export default App;
