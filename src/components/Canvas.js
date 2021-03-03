import { useEffect, useRef } from 'react';
import SnakeGame from '../game/game';
import Board from '../game/board';
import useKeyDown from '../hooks/useKeyDown';
import useRafHook from '../hooks/useRafAnimation';
import useInterval from '../hooks/useInterval';
import settings from '../game/settings';

const Game = (props) => {
  const { change, state, actions } = props;
  const { isGameOver, speed } = state;
  const canvasRef = useRef();
  const game = new SnakeGame(state, actions);
  // useRafHook(() => game._gameLoop(), isGameOver ? null : speed);
  useInterval(() => game._gameLoop(), isGameOver ? null : 300 / speed);
  useKeyDown(change, actions);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const board = new Board(state, settings, ctx);
    board._renderLoop();
  }, [state.tail, isGameOver]);

  return <canvas tabIndex="0" ref={canvasRef} width={560} height={400} />;
};

export default Game;
