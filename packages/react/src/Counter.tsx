import React, { useState } from 'react';

export const ReactCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="p-6 border-2 border-blue-400 bg-blue-50 rounded-xl my-4 text-center">
      <h3 className="text-xl font-bold text-blue-900 mb-2">React Component ⚛️</h3>
      <p className="text-blue-700 font-mono text-lg mb-4">Count: {count}</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-semibold"
      >
        Increment React
      </button>
    </div>
  );
};