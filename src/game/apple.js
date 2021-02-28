// @ts-check

import settings from './settings';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const createApple = (state) => {
  const { tail } = state;

  const {
    ceil,
    board: { width, height },
  } = settings;

  const maxX = (width - 20) / ceil;
  const maxY = (height - 40) / ceil;
  let isCoordsExist = 1,
    x,
    y;

  while (isCoordsExist >= 0) {
    x = getRandomNumber(0, maxX) * ceil + 10;
    y = getRandomNumber(0, maxY) * ceil + 10;

    isCoordsExist = tail.findIndex((el) => el.x === x && el.y === y);
  }

  return { x, y };
};

export default createApple;
