import React from 'react';
import { Trophy } from 'lucide-react';
import { UserScore } from '../types';

interface LeaderboardProps {
  scores: UserScore[];
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  const topThree = scores.slice(0, 3);

  return (
    <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800">Top Scorers</h2>
      </div>
      <div className="space-y-4">
        {topThree.map((score, index) => (
          <div
            key={`${score.nickname}-${score.timestamp}`}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
              <div>
                <a
                  href={`https://x.com/${score.xId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-indigo-600 hover:text-indigo-700"
                >
                  {score.nickname}
                </a>
                <div className="text-sm text-gray-500">
                  {new Date(score.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-800">{score.wpm} WPM</div>
              <div className="text-sm text-gray-500">{score.accuracy}% accuracy</div>
            </div>
          </div>
        ))}
        {topThree.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No scores yet. Be the first to play!
          </div>
        )}
      </div>
    </div>
  );
}