import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: {
    wpm: number;
    accuracy: number;
    correctWords: number;
  };
}

export default function ShareModal({ isOpen, onClose, score }: ShareModalProps) {
  if (!isOpen) return null;

  const shareText = `🎮 Just finished typing at ${score.wpm} WPM with ${score.accuracy}% accuracy! I typed ${score.correctWords} words correctly! Try to beat my score!`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Typing Speed Score',
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Score copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Share Your Score</h3>
        <p className="mb-6 text-gray-600">{shareText}</p>
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
          >
            Share Score
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}