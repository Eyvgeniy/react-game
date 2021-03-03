// @ts-check

class Snake {
  constructor(state, actions) {
    this.state = state;
    this.actions = actions;
  }

  _moveSnake = () => {
    const { tail, apple, moveQueue } = this.state;
    let dx, dy;
    if (moveQueue.length > 0) {
      const move = moveQueue[0];
      dx = move.dx;
      dy = move.dy;
    } else {
      dx = this.state.dx;
      dy = this.state.dy;
    }
    // return state;
    const { x, y } = tail[0];
    const newX = x + dx;
    const newY = y + dy;
    if (apple.x === newX && apple.y === newY) {
      this.actions.eatApple();
    } else {
      this.actions.move({ x: newX, y: newY, dx, dy });
      this.actions.unshiftMove();
    }
  };
}

export default Snake;
