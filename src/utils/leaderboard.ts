import { UserScore } from '../types';

const LEADERBOARD_KEY = 'typing_game_leaderboard';

export const saveScore = (score: UserScore) => {
  const leaderboard = getLeaderboard();
  leaderboard.push(score);
  
  // Sort by WPM and keep only top 10
  const topScores = leaderboard
    .sort((a, b) => b.wpm - a.wpm)
    .slice(0, 10);
  
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topScores));
};

export const getLeaderboard = (): UserScore[] => {
  const data = localStorage.getItem(LEADERBOARD_KEY);
  return data ? JSON.parse(data) : [];
};