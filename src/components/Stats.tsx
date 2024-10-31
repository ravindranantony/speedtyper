import React from 'react';

interface StatsProps {
  wpm: number;
  accuracy: number;
  correctWords: number;
  totalWords: number;
}

export default function Stats({ wpm, accuracy, correctWords, totalWords }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-indigo-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-600">{wpm}</div>
        <div className="text-sm text-gray-600">WPM</div>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-600">{accuracy}%</div>
        <div className="text-sm text-gray-600">Accuracy</div>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-600">{correctWords}</div>
        <div className="text-sm text-gray-600">Correct Words</div>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-600">{totalWords}</div>
        <div className="text-sm text-gray-600">Total Words</div>
      </div>
    </div>
  );
}