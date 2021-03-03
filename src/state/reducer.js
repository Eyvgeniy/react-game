import { useReducer } from 'react';
import { setToLocalStorage } from '../utils/localStorage';
import createApple from '../game/apple';
import settings from '../game/settings';
import sounds from '../game/sounds';

const actionTypes = {
  move: 'MOVE',
  changeDirection: 'CHANGE_DIRECTION',
  getMove: 'GET_MOVE',
  eatApple: 'EAT_APPLE',
  newGame: 'NEW_GAME',
  changeSoundVolume: 'CHANGE_SOUND_VOLUME',
  changeMusicVolume: 'CHANGE_MUSIC_VOLUME',
  changeSpeed: 'CHANGE_SPEED',
  changeSnakeColor: 'CHANGE_SNAKE_COLOR',
  changeAppleColor: 'CHANGE_APPLE_COLOR',
  toggleWalls: 'TOGGLE_WALLS',
  setDefault: 'SET_DEFAULT',
};

const defaultGameState = {
  tail: [
    { x: 110, y: 150 },
    { x: 90, y: 150 },
    { x: 70, y: 150 },
    { x: 50, y: 150 },
  ],
  cells: 4,
  snakeColor: '#000',
  dx: 20,
  dy: 0,
  moveQueue: [],
  apple: { x: 290, y: 150 },
  appleColor: '#d62828',
  speed: 1,
  score: 0,
  isGameOver: false,
  isStart: false,
  sound: 0.1,
  music: 0.1,
  walls: false,
};

sounds._changeSoundsVolume(defaultGameState.sound);
sounds._changeMusicVolume(defaultGameState.music);
sounds.musicPlaylist.music.loop = true;

const isCollision = (head, tail) => {
  if (tail.length > 4) {
    const idx = tail.findIndex((el) => el.x === head.x && el.y === head.y);
    return idx >= 0;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.move: {
      const { x, y, dx, dy } = action.payload;
      const { tail } = state;
      const {
        ceil,
        board: { width, height },
      } = settings;
      let currentX, currentY;
      if (state.walls) {
        currentX = x;
        currentY = y;
      } else {
        currentX = x < 10 ? width - ceil / 2 : x > width - ceil / 2 ? ceil / 2 : x;
        currentY = y < 10 ? height - ceil / 2 : y > height - ceil / 2 ? ceil / 2 : y;
      }

      const collision = isCollision({ x: currentX, y: currentY }, tail);
      const outOfWalls =
        currentX < 0 ||
        currentX > settings.board.width ||
        currentY < 0 ||
        currentY > settings.board.height;

      if (collision || outOfWalls) {
        sounds.soundsPlaylist.end.play();
        const newState = { ...state, isGameOver: true, isStart: false };
        setToLocalStorage(newState);
        return newState;
      }

      const newTail = [{ x: currentX, y: currentY }, ...tail];
      if (newTail.length > state.cells) {
        newTail.pop();
      }
      const newState = { ...state, tail: newTail, isStart: true, dx, dy };
      setToLocalStorage(newState);
      return newState;
    }
    case actionTypes.changeDirection: {
      const { movement } = action.payload;
      const { moveQueue, dx, dy } = state;
      let prevX, prevY;
      if (moveQueue.length > 0) {
        prevX = moveQueue[moveQueue.length - 1].x;
        prevY = moveQueue[moveQueue.length - 1].y;
      } else {
        prevX = dx;
        prevY = dy;
      }
      if (Math.abs(movement.dx) !== Math.abs(prevX) || Math.abs(movement.dy) !== Math.abs(prevY)) {
        return {
          ...state,
          moveQueue: [...moveQueue, { dx: movement.dx, dy: movement.dy }],
        };
      }

      return state;
    }

    case actionTypes.getMove: {
      const { moveQueue } = state;
      // if (moveQueue.length > 0) {
      //   const move = moveQueue[0];
      //   const newMoveQueue = moveQueue.slice(1);
      //   return { ...state, moveQueue: newMoveQueue, dx: move.dx, dy: move.dy };
      // }
      // return state;
      return { ...state, moveQueue: moveQueue.slice(1) };
    }

    case actionTypes.eatApple: {
      const { cells, apple, score, tail } = state;
      const { x, y } = createApple(state);
      sounds.soundsPlaylist.eat.play();
      return {
        ...state,
        cells: cells + 1,
        score: score + 1,
        tail: [{ x: apple.x, y: apple.y }, ...tail],
        apple: { x, y },
      };
    }

    case actionTypes.newGame: {
      const { music, speed, sound, snakeColor, appleColor } = state;
      return { ...defaultGameState, music, sound, speed, snakeColor, appleColor };
    }

    case actionTypes.changeSoundVolume: {
      const volume = action.payload;
      sounds._changeSoundsVolume(volume);
      return { ...state, sound: volume };
    }

    case actionTypes.changeMusicVolume: {
      const volume = action.payload;
      sounds._changeMusicVolume(volume);
      return { ...state, music: volume };
    }

    case actionTypes.changeSpeed: {
      const speed = action.payload;
      return { ...state, speed };
    }

    case actionTypes.changeSnakeColor: {
      const color = action.payload;
      return { ...state, snakeColor: color };
    }

    case actionTypes.changeAppleColor: {
      const color = action.payload;
      return { ...state, appleColor: color };
    }
    case actionTypes.toggleWalls: {
      const walls = action.payload;
      return { ...state, walls };
    }

    case actionTypes.setDefault: {
      return defaultGameState;
    }

    default:
      throw new Error('Unknow type of action');
  }
};

const useGameReducer = (gameState) => {
  const currentState = gameState || defaultGameState;
  const [state, dispatch] = useReducer(reducer, currentState);

  const actions = {
    move: (coords) => {
      dispatch({ type: actionTypes.move, payload: coords });
    },
    changeDirection: (movement) => {
      dispatch({ type: actionTypes.changeDirection, payload: { movement } });
    },
    unshiftMove: () => {
      dispatch({ type: actionTypes.getMove });
    },
    eatApple: () => {
      dispatch({ type: actionTypes.eatApple });
    },

    newGame: () => {
      dispatch({ type: actionTypes.newGame });
    },

    changeSoundVolume: (volume) => {
      dispatch({ type: actionTypes.changeSoundVolume, payload: volume });
    },
    changeMusicVolume: (volume) => {
      dispatch({ type: actionTypes.changeMusicVolume, payload: volume });
    },
    changeSpeed: (value) => {
      dispatch({ type: actionTypes.changeSpeed, payload: value });
    },
    changeAppleColor: (value) => {
      dispatch({ type: actionTypes.changeAppleColor, payload: value });
    },
    changeSnakeColor: (value) => {
      dispatch({ type: actionTypes.changeSnakeColor, payload: value });
    },
    toggleWalls: (value) => {
      dispatch({ type: actionTypes.toggleWalls, payload: value });
    },
    setDefault: () => {
      dispatch({ type: actionTypes.setDefault });
    },
  };

  return [state, actions];
};

export default useGameReducer;
