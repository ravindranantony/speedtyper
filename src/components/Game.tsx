import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Share2, RefreshCw, Trophy } from 'lucide-react';
import { words } from '../data/words';
import Stats from './Stats';
import ShareModal from './ShareModal';
import UserForm from './UserForm';
import Leaderboard from './Leaderboard';
import { saveScore, getLeaderboard } from '../utils/leaderboard';
import { UserScore } from '../types';

export default function Game() {
  const [gameState, setGameState] = useState<'init' | 'playing' | 'finished'>('init');
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const [score, setScore] = useState({ wpm: 0, accuracy: 0, correctWords: 0, totalAttempts: 0 });
  const [showShareModal, setShowShareModal] = useState(false);
  const [user, setUser] = useState<{ nickname: string; xId: string } | null>(null);
  const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const getRandomWord = useCallback(() => {
    return words[Math.floor(Math.random() * words.length)];
  }, []);

  const calculateWPM = useCallback((correctWords: number, elapsedTimeInSeconds: number) => {
    if (elapsedTimeInSeconds === 0) return 0;
    const timeInMinutes = elapsedTimeInSeconds / 60;
    return Math.round(correctWords / timeInMinutes);
  }, []);

  const handleUserSubmit = (nickname: string, xId: string) => {
    setUser({ nickname, xId });
    startGame();
  };

  const startGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setGameState('playing');
    setTimeLeft(90);
    setScore({ wpm: 0, accuracy: 0, correctWords: 0, totalAttempts: 0 });
    setCurrentWord(getRandomWord());
    setInput('');
    startTimeRef.current = Date.now();

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [getRandomWord]);

  const endGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameState('finished');
    
    const elapsedTimeInSeconds = Math.min(90, (Date.now() - startTimeRef.current) / 1000);
    
    setScore(prev => {
      const wpm = calculateWPM(prev.correctWords, elapsedTimeInSeconds);
      const accuracy = prev.totalAttempts > 0 
        ? Math.round((prev.correctWords / prev.totalAttempts) * 100) 
        : 0;
      
      const finalScore = { ...prev, wpm, accuracy };
      
      if (user) {
        const userScore: UserScore = {
          nickname: user.nickname,
          xId: user.xId,
          wpm,
          accuracy,
          correctWords: prev.correctWords,
          timestamp: Date.now()
        };
        saveScore(userScore);
        setLeaderboard(getLeaderboard());
      }
      
      return finalScore;
    });
  }, [calculateWPM, user]);

  // ... rest of the existing game logic ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Speed Typer</h1>
            <p className="text-gray-600">Test your typing speed and accuracy</p>
          </div>

          {gameState === 'init' && (
            <UserForm onSubmit={handleUserSubmit} />
          )}

          {gameState === 'playing' && (
            <>
              <div className="text-center">
                <div className="text-5xl font-bold mb-4 text-indigo-600">{timeLeft}</div>
                <div className="text-3xl font-medium text-gray-700 mb-6">{currentWord}</div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full max-w-md text-center text-xl p-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Type here..."
                  autoFocus
                />
              </div>
              
              <Stats
                wpm={score.wpm}
                accuracy={score.accuracy}
                correctWords={score.correctWords}
                totalWords={score.totalAttempts}
              />

              <button
                onClick={endGame}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition"
              >
                <Square className="w-5 h-5" />
                Stop Game
              </button>
            </>
          )}

          {gameState === 'finished' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-xl p-6 text-center">
                <Trophy className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
                <Stats
                  wpm={score.wpm}
                  accuracy={score.accuracy}
                  correctWords={score.correctWords}
                  totalWords={score.totalAttempts}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setGameState('init');
                    setUser(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  <RefreshCw className="w-5 h-5" />
                  New Game
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  <Share2 className="w-5 h-5" />
                  Share Score
                </button>
              </div>
            </div>
          )}
        </div>

        <Leaderboard scores={leaderboard} />
      </div>

      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          score={score}
        />
      )}
    </div>
  );
}