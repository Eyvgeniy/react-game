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
  setDefault: 'SET_DEFAUL',
  changeSoundVolume: 'CHANGE_SOUND_VOLUME',
};

const defaultGameState = {
  tail: [{ x: 50, y: 50 }],
  cells: 4,
  dx: 0,
  dy: 20,
  moveQueue: [],
  apple: { x: 150, y: 110, ate: false },
  speed: 100,
  score: 0,
  isGameOver: false,
  isStart: false,
  sound: {
    on: true,
    volume: 0.1,
  },
  music: {
    on: true,
    volume: 0.1,
  },
};

const isCollision = (head, tail) => {
  if (tail.length > 4) {
    const idx = tail.findIndex((el) => el.x === head.x && el.y === head.y);
    return idx >= 0;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.move: {
      const { x, y } = action.payload;
      const { tail } = state;
      const {
        ceil,
        board: { width, height },
      } = settings;
      const currentX = x < 10 ? width - ceil / 2 : x > width - ceil / 2 ? ceil / 2 : x;
      const currentY = y < 10 ? height - ceil / 2 : y > height - ceil / 2 ? ceil / 2 : y;

      const collision = isCollision({ x: currentX, y: currentY }, tail);

      if (collision) {
        sounds.soundsPlaylist.end.play();
        const newState = { ...state, isGameOver: true, isStart: false };
        setToLocalStorage(newState);
        return newState;
      }

      const newTail = [{ x: currentX, y: currentY }, ...tail];
      if (newTail.length > state.cells) {
        newTail.pop();
      }
      const newState = { ...state, tail: newTail, isStart: true };
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
          dx: movement.dx,
          dy: movement.dy,
          // moveQueue: [...moveQueue, { dx: movement.dx, dy: movement.dy }],
        };
      }

      return state;
    }

    case actionTypes.getMove: {
      const { moveQueue } = state;
      if (moveQueue.length > 0) {
        const move = moveQueue[0];
        const newMoveQueue = moveQueue.slice(1);
        return { ...state, moveQueue: newMoveQueue, dx: move.dx, dy: move.dy };
      }
      return state;
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

    case actionTypes.setDefault: {
      return { ...defaultGameState };
    }

    case actionTypes.changeSoundVolume: {
      const volume = action.payload;
      sounds._changeSoundsVolume(volume);
      return { ...state, sound: { ...state.sound, volume: volume } };
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
    getMove: () => {
      dispatch({ type: actionTypes.getMove });
    },
    eatApple: () => {
      dispatch({ type: actionTypes.eatApple });
    },

    setDefault: () => {
      dispatch({ type: actionTypes.setDefault });
    },

    changeSoundVolume: (volume) => {
      dispatch({ type: actionTypes.changeSoundVolume, payload: volume });
    },
  };

  return [state, actions];
};

export default useGameReducer;
