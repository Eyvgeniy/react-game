import { useEffect, useRef } from 'react';
import SnakeGame from '../game/game';
import Board from '../game/board';
import useKeyDown from '../hooks/useKeyDown';
import useRafHook from '../hooks/useRafAnimation';
import settings from '../game/settings';

const Game = (props) => {
  const { change, state, actions } = props;
  const canvasRef = useRef();
  const game = new SnakeGame(state, actions);
  useKeyDown(change, actions);
  useRafHook(() => game._gameLoop(), 1000);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const board = new Board(state, settings, ctx);
    board._renderLoop();
  });

  return <canvas tabIndex="0" ref={canvasRef} width={560} height={440} />;
};

export default Game;
