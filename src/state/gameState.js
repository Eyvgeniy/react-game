import React from 'react';

const defaultGameState = {
  tail: [{ x: 50, y: 50 }],
  cells: 4,
  x: 50,
  y: 50,
  dx: 0,
  dy: 20,
  moveQueue: [],
  apple: { x: 150, y: 100, ate: false },
  speed: 500,
  score: 0,
};

const useGameState = (state = defaultGameState) => {
  const [gameState, setGameState] = React.useState(state);

  return [gameState, setGameState];
};

export default useGameState;
