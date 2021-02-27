import Board from './board';
import Snake from './snake';
import settings from './settings';

class Game {
  constructor(state, setState, ctx) {
    this.state = state;
    this.setState = setState;
    this.ctx = ctx;
    this.board = new Board(state, settings, ctx);
    this.snake = new Snake(state, setState);
  }

  _renderLoop = () => {
    this.board._renderField();
    this.board._renderSnake();
  };

  _gameLoop = () => {
    this.snake._moveSnake();
  };
}

export default Game;
