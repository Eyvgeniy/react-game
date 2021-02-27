// @ts-check

const colors = {
  board: '#c4ccb0',
  ceil: '#b5bca1',
  line: 'black',
  apple: '#d62828',
};

const ceil = 20;

const indent = 1;
const innerRect = indent + 3;

const rect = {
  side: ceil - 1,
  indent,
  indentSide: ceil - indent - 2,
  innerRect,
  innerRectSide: ceil - innerRect - 5,
};

const width = 420;
const height = 420;
const board = {
  x: 10,
  y: 10,
  width,
  height,
  rows: height / ceil,
  columns: width / ceil,
};

const frame2 = {
  line: 2,
  x: 6,
  y: 6,
  width: 428,
  height: 428,
};

const sounds = [
  ['eat', 'sounds/eat.wav'],
  ['start', 'sounds/start.wav'],
  ['end', 'sounds/end.wav'],
  ['music', 'sounds/music.mp3'],
];

export default { colors, ceil, rect, board, frame2, sounds };
