import SnakeGame from '../game/game';
import useKeyDown from '../hooks/useKeyDown';
import useRafHook from '../hooks/useRafAnimation';

const Game = ({ change, state, actions }) => {
  const game = new SnakeGame(state, actions);
  useRafHook(() => game._gameLoop(), 100);
  useKeyDown(change, actions);

  return <></>;
};

export default Game;
