// @ts-check

class Snake {
  constructor(state, actions) {
    this.state = state;
    this.actions = actions;
  }

  _moveSnake = () => {
    const { tail, dx, dy, apple } = this.state;
    const { x, y } = tail[0];
    const newX = x + dx;
    const newY = y + dy;
    if (apple.x === newX && apple.y === newY) {
      this.actions.eatApple();
    } else {
      this.actions.move({ x: newX, y: newY });
    }
  };
}

export default Snake;
