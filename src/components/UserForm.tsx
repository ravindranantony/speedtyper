import React from 'react';

interface UserFormProps {
  onSubmit: (nickname: string, xId: string) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [nickname, setNickname] = React.useState('');
  const [xId, setXId] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname && xId) {
      onSubmit(nickname, xId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
          Nickname
        </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="xId" className="block text-sm font-medium text-gray-700 mb-1">
          X (Twitter) ID
        </label>
        <input
          type="text"
          id="xId"
          value={xId}
          onChange={(e) => setXId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
      >
        Start Game
      </button>
    </form>
  );
}