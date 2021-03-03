//@ts-check

function renderRect(x, y, settings, ctx, mainColor) {
  const { rect, colors } = settings;
  ctx.fillStyle = mainColor;
  ctx.fillRect(x, y, rect.side, rect.side);

  ctx.fillStyle = colors.board;
  ctx.fillRect(rect.indent + x, rect.indent + y, rect.indentSide, rect.indentSide);

  ctx.fillStyle = mainColor;
  ctx.fillRect(rect.innerRect + x, rect.innerRect + y, rect.innerRectSide, rect.innerRectSide);
}

class Board {
  constructor(state, settings, ctx) {
    this.state = state;
    this.settings = settings;
    this.ctx = ctx;
  }

  _renderLoop = () => {
    this._clearBoard();
    this._renderField();
    this._renderSnake();
    this._renderApple();
    this._renderScore();
    if (this.state.isGameOver) {
      this._renderGameOver();
    }
  };

  _renderField() {
    const { board, ceil } = this.settings;
    this._renderSecondFrame();
    for (let i = board.x; i <= board.width; i += ceil) {
      for (let j = board.y; j <= board.height; j += ceil) {
        this._renderFieldRect(i, j);
      }
    }
  }

  _renderFieldRect(x, y) {
    const ctx = this.ctx;
    const settings = this.settings;
    const color = settings.colors.ceil;
    renderRect(x, y, settings, ctx, color);
  }

  _renderSnake() {
    const { tail } = this.state;
    tail.forEach(({ x, y }) => this._renderSnakeRect(x, y));
    const [head] = tail;
    this._renderSnakeHead(head.x, head.y);
  }

  _renderSnakeRect(x, y) {
    const ctx = this.ctx;
    const settings = this.settings;
    const color = this.state.snakeColor;
    renderRect(x, y, settings, ctx, color);
  }

  _renderSnakeHead(x, y) {
    const ctx = this.ctx;
    const settings = this.settings;
    const color = this.state.snakeColor;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, settings.rect.side, settings.rect.side);
  }

  _renderApple() {
    const { apple } = this.state;
    renderRect(apple.x, apple.y, this.settings, this.ctx, this.state.appleColor);
  }

  _clearBoard() {
    const { width, height } = this.settings.board;
    this.ctx.clearRect(0, 0, 560, 440);
  }

  _renderSecondFrame() {
    const ctx = this.ctx;
    const {
      colors,
      frame2: { x, y, line, width, height },
    } = this.settings;

    ctx.fillStyle = colors.line;
    ctx.fillRect(x, y, width, height);
    ctx.clearRect(x + line, y + line, width - 2 * line, height - 2 * line);
  }

  _renderScore() {
    const ctx = this.ctx;
    const settings = this.settings;
    const color = settings.colors.line;
    const { score } = this.state;
    renderRect(450, 30, this.settings, this.ctx, this.state.appleColor);
    ctx.fillStyle = color;
    // ctx.font = '30px Roboto';
    // ctx.fillText(`Score:`, 445, 50);
    ctx.font = '35px Roboto';
    ctx.fillText(`0${score}`, 480, 50);
    ctx.font = '30px Roboto';
    ctx.fillText(`Top: 100`, 445, 90);
  }

  _renderGameOver() {
    const ctx = this.ctx;
    const settings = this.settings;
    const color = settings.colors.apple;
    ctx.clearRect(70, 110, 300, 200);
    ctx.fillStyle = color;
    ctx.fillRect(70, 110, 300, 200);
    ctx.clearRect(73, 113, 294, 194);
    ctx.font = '40px Roboto';
    ctx.fillText('GAME OVER', 100, 220);
  }
}

export default Board;
