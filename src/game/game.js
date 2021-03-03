import Board from './board';
import Snake from './snake';
import settings from './settings';

class Game {
  constructor(state, actions, ctx) {
    this.state = state;
    this.actions = actions;
    this.ctx = ctx;
    // this.board = new Board(state, settings, ctx);
    this.snake = new Snake(state, actions);
  }

  _renderLoop = () => {
    this.board._renderField();
    this.board._renderSnake();
  };

  _gameLoop = () => {
    this.snake._moveSnake();
    // this.actions.getMove();
  };

  _getMove = () => {
    this.actions.getMove();
  };
}

export default Game;
