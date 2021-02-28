// @ts-check

import settings from './settings';

class Snake {
  constructor(state, actions) {
    this.state = state;
    this.actions = actions;
  }

  _moveSnake = () => {
    const { width, height } = settings.board;
    const { ceil, frame2 } = settings;
    const { tail, cells, dx, dy, apple } = this.state;
    const { x, y } = tail[0];
    const newX = x + dx;
    const newY = y + dy;
    let newTail = [{ x: newX, y: newY }, ...tail];
    if (apple.x === newX && apple.y === newY) {
      this.actions.eatApple();
    } else {
      this.actions.move({ x: newX, y: newY });
    }

    // this.actions.getMove();
    // this.setState((state) => ({ ...state, x: newX }));
    // this.setState((state) => ({ ...state, y: newY }));
    // this.setState((state) => {
    //   return { ...state, tail: newTail };
    // });
  };
}

export default Snake;
