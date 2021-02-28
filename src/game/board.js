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
    this._renderField();
    this._renderSnake();
    this._renderApple();
  };

  _renderField() {
    const { board, ceil, colors, frame2 } = this.settings;

    // this._renderFirstFrame();
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
    const color = settings.colors.line;
    renderRect(x, y, settings, ctx, color);
  }

  _renderSnakeHead(x, y) {
    const ctx = this.ctx;
    const settings = this.settings;
    const color = settings.colors.line;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, settings.rect.side, settings.rect.side);
  }

  _renderApple() {
    const { apple } = this.state;
    renderRect(apple.x, apple.y, this.settings, this.ctx, this.settings.colors.apple);
  }

  _clearBoard() {
    const { width, height } = this.settings.board;
    this.ctx.clearRect(0, 0, width, height);
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
    ctx.fillStyle = color;
    ctx.font = '30px Roboto';
    ctx.fillText(`SCORE:`, 470, 50);
    ctx.font = '35px myfont';
    ctx.fillText(`00${score}`, 480, 90);
  }
}

export default Board;
