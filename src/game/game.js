import Snake from './snake';

class Game {
  constructor(state, actions, ctx) {
    this.state = state;
    this.actions = actions;
    this.ctx = ctx;
    this.snake = new Snake(state, actions);
  }

  _renderLoop = () => {
    this.board._renderField();
    this.board._renderSnake();
  };

  _gameLoop = () => {
    this.snake._moveSnake();
  };

  _getMove = () => {
    this.actions.getMove();
  };
}

export default Game;
