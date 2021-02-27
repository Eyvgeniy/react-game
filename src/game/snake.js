// @ts-check

import settings from './settings';

class Snake {
  constructor(state, setState) {
    this.state = state;
    this.setState = setState;
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
      this.setState((state) => ({ ...state, apple: { ...state.apple, ate: true } }));
      this.setState((state) => ({ ...state, cells: state.cells + 1 }));
      this.setState((state) => ({ ...state, score: state.score + 1 }));
      this.setState((state) => ({ ...state, speed: state.speed - 5 }));
    }

    if (newTail.length > cells) {
      newTail.pop();
    }

    // this.setState((state) => ({ ...state, x: newX }));
    // this.setState((state) => ({ ...state, y: newY }));
    this.setState((state) => {
      return { ...state, tail: newTail };
    });
  };
}

export default Snake;
