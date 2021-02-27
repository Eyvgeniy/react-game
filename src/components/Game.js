import { useEffect, useRef, useCallback } from 'react';
import SnakeGame from '../game/game';
import useExit from '../hooks/useExitHook';
import useRafHook from '../hooks/useRafAnimation';

const Game = (props) => {
  const canvasRef = useRef();
  const { change, state, setState } = props;
  useExit(change);

  const game = new SnakeGame(state, setState);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = new SnakeGame(state, setState, ctx);
    game._renderLoop();
  }, [state]);

  useRafHook(game._gameLoop, 500);

  return <canvas ref={canvasRef} width={560} height={440} />;
};

export default Game;
