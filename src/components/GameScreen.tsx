import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { createMaskedWord } from "../data/words";
import { useSpeechToText } from "../hooks/useSpeechToText";
import type { GameState } from "../types/game";
import { GAME_CONFIG } from "../constants/gameConfig";

interface GameScreenProps {
  gameState: GameState;
  onAnswerSelected: (answer: string) => void;
  onNextTurn: () => void;
  onBackToStart: () => void;
}

const AnimatedWord: React.FC<{
  letters: string[];
  opacities: number[];
  className?: string;
}> = ({ letters, opacities, className = "" }) => {
  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: opacities[index] || 0,
            scale: opacities[index] ? 1 : 0.5
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: opacities[index] ? 0 : 0
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

// Simple normalization helper
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

// Basic optional length hinting (not enforced)
const useLengthHint = (targetLen: number | null, value: string) => {
  if (!targetLen) return { hint: "", ok: true };
  const diff = targetLen - value.replace(/\s/g, "").length;
  if (diff === 0) return { hint: "Perfect length ✅", ok: true };
  if (diff > 0)
    return {
      hint: `${diff} more ${diff === 1 ? "letter" : "letters"}`,
      ok: false,
    };
  return { hint: `${Math.abs(diff)} extra`, ok: true };
};

const TextAnswerInput: React.FC<{
  disabled?: boolean;
  onSubmit: (val: string) => void;
  expectedLength?: number;
}> = ({ disabled, onSubmit, expectedLength }) => {
  const [value, setValue] = useState("");
  const { hint, ok } = useLengthHint(expectedLength ?? null, value);

  const submit = () => {
    const v = normalize(value);
    if (!disabled && v) {
      onSubmit(v);
      setValue("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col items-center gap-2 justify-center"
    >
      <div className="flex items-center gap-2">
        <input
          autoFocus
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your guess..."
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg min-w-[260px]"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={disabled || !value.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50"
        >
          Submit
        </motion.button>
      </div>
      {expectedLength ? (
        <div className={`text-sm ${ok ? "text-gray-500" : "text-amber-600"}`}>
          Expected: {expectedLength} letters • {hint}
        </div>
      ) : null}
    </form>
  );
};

const TilesAnswerInput: React.FC<{
  wordLength: number;
  disabled?: boolean;
  onSubmit: (val: string) => void;
}> = ({ wordLength, disabled, onSubmit }) => {
  const [letters, setLetters] = useState<string[]>(Array(wordLength).fill(""));
  const refs = useMemo(
    () =>
      Array.from({ length: wordLength }, () =>
        React.createRef<HTMLInputElement>()
      ),
    [wordLength]
  );

  useEffect(() => {
    if (refs[0]?.current) refs[0].current.focus();
  }, [wordLength, refs]);

  const setAt = (i: number, val: string) => {
    const c = val.slice(-1).replace(/[^a-zA-Z]/g, "");
    const next = [...letters];
    next[i] = c.toLowerCase();
    setLetters(next);
    if (c && i < wordLength - 1) {
      refs[i + 1]?.current?.focus();
    }
    // Auto submit if last box filled
    if (c && i === wordLength - 1) {
      const guess = next.join("");
      if (guess.length === wordLength) onSubmit(normalize(guess));
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (letters[i]) {
        const next = [...letters];
        next[i] = "";
        setLetters(next);
      } else if (i > 0) {
        refs[i - 1]?.current?.focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs[i - 1]?.current?.focus();
    } else if (e.key === "ArrowRight" && i < wordLength - 1) {
      refs[i + 1]?.current?.focus();
    } else if (e.key === "Enter") {
      const guess = letters.join("");
      if (guess.trim().length === wordLength) onSubmit(normalize(guess));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, wordLength)
      .toLowerCase();
    const next = [...letters];
    for (let i = 0; i < paste.length; i++) next[i] = paste[i];
    setLetters(next);
    refs[Math.min(paste.length, wordLength - 1)]?.current?.focus();
  };

  const clearAll = () => {
    setLetters(Array(wordLength).fill(""));
    refs[0]?.current?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {letters.map((ch, i) => (
          <input
            key={i}
            ref={refs[i]}
            disabled={disabled}
            value={ch}
            onChange={(e) => setAt(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            inputMode="text"
            maxLength={2}
            className="w-12 h-12 text-center text-2xl font-bold border-2 border-purple-300 rounded-xl focus:border-purple-500"
          />
        ))}
      </div>
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const guess = letters.join("");
            if (guess.trim().length === wordLength) onSubmit(normalize(guess));
          }}
          disabled={disabled || letters.join("").length !== wordLength}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold disabled:opacity-50"
        >
          Submit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearAll}
          disabled={disabled}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold disabled:opacity-50"
        >
          Clear
        </motion.button>
      </div>
    </div>
  );
};

const VoiceAnswerInput: React.FC<{
  disabled?: boolean;
  onSubmit: (val: string) => void;
}> = ({ disabled, onSubmit }) => {
  const [lang, setLang] = useState("en-US");
  const { isListening, transcript, error, start, stop, supported } =
    useSpeechToText({ lang });
  const [editedTranscript, setEditedTranscript] = useState("");

  useEffect(() => {
    if (transcript) {
      setEditedTranscript(transcript);
    }
  }, [transcript]);

  const submit = () => {
    const v = normalize(editedTranscript);
    if (!disabled && v) {
      onSubmit(v);
      setEditedTranscript("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {!supported && (
        <div className="text-sm text-red-600">
          Voice input is not supported in this browser. Please use Text or Tiles
          mode.
        </div>
      )}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="font-medium mb-1">⚠️ {error}</div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <select
          disabled={disabled || !supported || isListening}
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="px-3 py-2 border-2 border-green-300 rounded-xl focus:border-green-500"
          aria-label="Recognition language"
        >
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="en-NG">English (NG)</option>
          <option value="fr-FR">Français</option>
          <option value="es-ES">Español</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={disabled || !supported}
          onClick={isListening ? stop : start}
          className={`px-6 py-3 rounded-xl font-bold text-white ${
            isListening ? "bg-red-600 animate-pulse" : "bg-green-600"
          } disabled:opacity-50`}
        >
          {isListening ? "Stop Listening 🎙️" : "Start Listening 🎙️"}
        </motion.button>
      </div>
      {isListening && (
        <div className="text-sm text-green-600 animate-pulse">
          🎤 Listening... Speak clearly into your microphone
        </div>
      )}
      <textarea
        disabled={disabled || !supported}
        value={editedTranscript}
        onChange={(e) => setEditedTranscript(e.target.value)}
        placeholder="Say your guess… you can edit before submitting."
        rows={3}
        className="px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none text-lg min-w-[260px] w-full"
      />
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={submit}
          disabled={disabled || !editedTranscript.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50"
        >
          Submit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditedTranscript("");
          }}
          disabled={disabled}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold disabled:opacity-50"
        >
          Clear
        </motion.button>
      </div>
    </div>
  );
};

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  onAnswerSelected,
  onNextTurn,
  onBackToStart,
}) => {
  const [hintVisible, setHintVisible] = useState(false);
  const [hintTimeLeft, setHintTimeLeft] = useState<number>(GAME_CONFIG.HINT_DURATION);
  const [gameTimeLeft, setGameTimeLeft] = useState<number>(GAME_CONFIG.GAME_DURATION);
  const [showResult, setShowResult] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [revealingLetters, setRevealingLetters] = useState<string[]>([]);
  const [letterOpacities, setLetterOpacities] = useState<number[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);

  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const currentWord = gameState.words[gameState.currentWordIndex];
  const maskedWord = useMemo(
    () => createMaskedWord(currentWord.word),
    [currentWord.word]
  );

  // Handle hint timer
  useEffect(() => {
    if (hintVisible && !showResult) {
      const timer = setInterval(() => {
        setHintTimeLeft((prev) => {
          if (prev <= 1) {
            setHintVisible(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [hintVisible, showResult]);

  // Handle game timer with auto reveal and scoring (0 on timeout)
  useEffect(() => {
    if (!showResult && !answerRevealed && gameState.selectedAnswer === null) {
      setGameTimeLeft(GAME_CONFIG.GAME_DURATION);

      const timer = setInterval(() => {
        setGameTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Only submit if no answer yet
            if (gameState.selectedAnswer === null) {
              onAnswerSelected("");
            }
            setAnswerRevealed(true);
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [
    gameState.currentWordIndex,
    gameState.currentTeamIndex,
    showResult,
    answerRevealed,
    gameState.selectedAnswer,
    onAnswerSelected,
  ]);

  // Reset reveal state when moving to a new word
  useEffect(() => {
    setShowResult(false);
    setAnswerRevealed(false);
    setHintVisible(false);
    setHintTimeLeft(GAME_CONFIG.HINT_DURATION);
    setGameTimeLeft(GAME_CONFIG.GAME_DURATION);
    setRevealingLetters([]);
    setLetterOpacities([]);
    setIsRevealing(false);
  }, [gameState.currentWordIndex, gameState.currentTeamIndex]);

  const handleRevealAnswer = () => {
    if (!answerRevealed) {
      setAnswerRevealed(true);
      setShowResult(true);
      startLetterReveal();
    }
  };

  const startLetterReveal = () => {
    const word = currentWord.correctAnswer;
    const wordArray = word.split("");

    // Start with all letters visible but with 0 opacity for animation
    setRevealingLetters(wordArray);
    setLetterOpacities(new Array(wordArray.length).fill(0));
    setIsRevealing(true);

    let currentIndex = 0;
    const revealInterval = setInterval(() => {
      if (currentIndex < wordArray.length) {
        // Animate each letter in sequence
        setLetterOpacities((prevOpacities) => {
          const newOpacities = [...prevOpacities];
          newOpacities[currentIndex] = 1;
          return newOpacities;
        });
        currentIndex++;
      } else {
        clearInterval(revealInterval);
        setIsRevealing(false);
      }
    }, 250); // Reveal one letter every 250ms for more dramatic effect
  };

  // When an answer is submitted (from any mode), stop timer and show result
  useEffect(() => {
    if (gameState.selectedAnswer !== null) {
      setShowResult(true);
      setAnswerRevealed(true);
      // Start letter reveal animation
      startLetterReveal();
    }
  }, [gameState.selectedAnswer]);

  const handleNextTurn = () => {
    setShowResult(false);
    setHintVisible(false);
    setHintTimeLeft(GAME_CONFIG.HINT_DURATION);
    setAnswerRevealed(false);
    setRevealingLetters([]);
    setLetterOpacities([]);
    setIsRevealing(false);
    onNextTurn();
  };

  const getNextTeam = () => {
    const nextIndex = (gameState.currentTeamIndex + 1) % gameState.teams.length;
    return gameState.teams[nextIndex];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with team info and progress */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: currentTeam.color }}
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 funky-text">
                  {currentTeam.name}'s Turn
                </h2>
                <p className="text-gray-600">
                  Score: {currentTeam.score} points
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-700">
                Word {gameState.currentWordIndex + 1} of{" "}
                {gameState.words.length}
              </p>
              <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((gameState.currentWordIndex + 1) /
                        gameState.words.length) *
                      100
                    }%`,
                  }}
                />
              </div>
              {/* Game Timer - moved to be less intrusive */}
              {!showResult && !answerRevealed && (
                <div className="mt-3">
                  <div
                    className={`text-lg font-semibold ${
                      gameTimeLeft <= 5
                        ? "text-red-600 animate-pulse"
                        : "text-gray-600"
                    }`}
                  >
                    {gameTimeLeft}s
                  </div>
                  <div className="text-xs text-gray-400">remaining</div>
                </div>
              )}
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Stop any timers and navigate back
                    setShowResult(false);
                    onBackToStart();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                >
                  ← Back to Start
                </motion.button>
              </div>
            </div>
          </div>

          {/* Next team indicator */}
          {!showResult && (
            <div className="text-center text-sm text-gray-500">
              Next up:{" "}
              <span className="font-semibold">{getNextTeam().name}</span>
            </div>
          )}
        </motion.div>

        {/* Main game area */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Word display */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center funky-text">
              Guess the Word! 🤔
            </h3>

            <motion.div
              key={currentWord.word}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center mb-8"
            >
              <div className="text-4xl font-bold text-gray-800 tracking-wider mb-4 font-mono bg-gray-100 p-6 rounded-xl">
                {answerRevealed && gameState.isAnswerCorrect === false ? (
                  isRevealing ? (
                    <AnimatedWord
                      letters={revealingLetters}
                      opacities={letterOpacities}
                      className="justify-center"
                    />
                  ) : (
                    <AnimatedWord
                      letters={currentWord.correctAnswer.split("")}
                      opacities={new Array(currentWord.correctAnswer.length).fill(1)}
                      className="justify-center"
                    />
                  )
                ) : (
                  maskedWord
                )}
              </div>
              <div className="text-lg text-gray-600 classic-text">
                {currentWord.correctAnswer.replace(/\s+/g, "").length} letters
              </div>
              {answerRevealed && gameState.isAnswerCorrect === false && isRevealing && (
                <div className="text-sm text-blue-600 mt-2 animate-pulse">
                  Revealing the answer...
                </div>
              )}
            </motion.div>

            {/* Hint display */}
            <AnimatePresence mode="wait">
              {hintVisible && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    transition: { duration: 0.4, ease: "easeInOut" }
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    layout: { duration: 0.2 }
                  }}
                  layout
                  className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4 mb-6 overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="flex justify-between items-center mb-2"
                  >
                    <h4 className="font-bold text-yellow-800 funky-text">
                      💡 Hint:
                    </h4>
                    <motion.div
                      key={hintTimeLeft}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                    >
                      {hintTimeLeft}s
                    </motion.div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-yellow-800 classic-text"
                  >
                    {currentWord.hint}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            {!showResult && (
              <div className="flex items-center justify-center gap-4">
                {!hintVisible && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setHintVisible(true);
                      setHintTimeLeft(GAME_CONFIG.HINT_DURATION);
                    }}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors"
                  >
                    Show Hint ({GAME_CONFIG.HINT_DURATION}s) 💡
                  </motion.button>
                )}
                {!answerRevealed && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRevealAnswer}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    Show Answer ✅
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>

          {/* Answer input and reveal panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center funky-text">
              {answerRevealed ? "Answer 🔍" : "Your Guess 🎯"}
            </h3>

            {!answerRevealed && (
              <div className="mb-6">
                {gameState.answerMode === "text" && (
                  <TextAnswerInput
                    disabled={answerRevealed}
                    expectedLength={
                      currentWord.correctAnswer.replace(/\s+/g, "").length
                    }
                    onSubmit={(val) => {
                      // Normalize both sides to be safe
                      const guess = normalize(val);
                      onAnswerSelected(guess);
                      // Reveal immediately; App will handle scoring
                      setShowResult(true);
                      setAnswerRevealed(true);
                    }}
                  />
                )}

                {gameState.answerMode === "tiles" && (
                  <TilesAnswerInput
                    wordLength={
                      currentWord.correctAnswer.replace(/\s+/g, "").length
                    }
                    disabled={answerRevealed}
                    onSubmit={(val) => {
                      const guess = normalize(val);
                      onAnswerSelected(guess);
                      setShowResult(true);
                      setAnswerRevealed(true);
                    }}
                  />
                )}

                {gameState.answerMode === "voice" && (
                  <VoiceAnswerInput
                    disabled={answerRevealed}
                    onSubmit={(val) => {
                      const guess = normalize(val);
                      onAnswerSelected(guess);
                      setShowResult(true);
                      setAnswerRevealed(true);
                    }}
                  />
                )}
              </div>
            )}

            <div className="text-center">
              {!answerRevealed ? (
                <div className="text-gray-500">
                  Submit your guess above, press "Show Answer", or wait for the
                  timer.
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`${
                    gameState.isAnswerCorrect === false
                      ? "bg-red-50 border-2 border-red-200"
                      : "bg-green-50 border-2 border-green-200"
                  } rounded-xl p-6`}
                >
                  <div className="text-5xl mb-2">
                    {gameState.isAnswerCorrect === false ? "❌" : "✅"}
                  </div>
                  <h4 className="text-2xl font-bold funky-text mb-2">
                    {gameState.isAnswerCorrect === false
                      ? gameState.selectedAnswer === null
                        ? "Time's up! ⏰"
                        : "Wrong answer! 😞"
                      : "Correct! 🎉"}
                  </h4>
                  {gameState.isAnswerCorrect === false && (
                    <div className="mb-4">
                      <p className="text-lg text-gray-600 mb-2">
                        {gameState.selectedAnswer === null
                          ? "You ran out of time. The answer was:"
                          : `You guessed: "${gameState.selectedAnswer}". The correct answer is:`}
                      </p>
                    </div>
                  )}
                  <div className="text-3xl font-extrabold tracking-wider mb-4 font-mono">
                    {isRevealing ? (
                      <AnimatedWord
                        letters={revealingLetters}
                        opacities={letterOpacities}
                        className="justify-center"
                      />
                    ) : (
                      <AnimatedWord
                        letters={currentWord.correctAnswer.split("")}
                        opacities={new Array(currentWord.correctAnswer.length).fill(1)}
                        className="justify-center"
                      />
                    )}
                  </div>
                  {gameState.isAnswerCorrect === false && (
                    <div className="text-sm text-gray-500">
                      {isRevealing ? "Revealing the answer..." : "Answer revealed!"}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Result action */}
              <AnimatePresence>
                {answerRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextTurn}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                    >
                      {gameState.currentWordIndex < gameState.words.length - 1
                        ? "Next Turn →"
                        : "View Results 🏆"}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Team scores sidebar */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-6 bg-white rounded-2xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 funky-text text-center">
            Current Scores 📊
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {gameState.teams.map((team) => (
              <motion.div
                key={team.id}
                whileHover={{ scale: 1.05 }}
                className={`p-3 rounded-xl text-center ${
                  team.id === currentTeam.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-gray-100"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: team.color }}
                />
                <div className="font-bold text-sm funky-text">{team.name}</div>
                <div className="text-lg font-bold">{team.score}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
