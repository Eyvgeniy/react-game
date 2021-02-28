import { useReducer } from 'react';
import settings from '../game/settings';

const actionTypes = {
  move: 'MOVE',
  changeDirection: 'CHANGE_DIRECTION',
  getMove: 'GET_MOVE',
  eatApple: 'EAT_APPLE',
};

const defaultGameState = {
  tail: [{ x: 50, y: 50 }],
  cells: 4,
  dx: 0,
  dy: 20,
  moveQueue: [],
  apple: { x: 150, y: 110, ate: false },
  speed: 500,
  score: 0,
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
      const newTail = [{ x: currentX, y: currentY }, ...tail];
      if (newTail.length > state.cells) {
        newTail.pop();
      }
      return { ...state, tail: newTail };
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
      return {
        ...state,
        cells: cells + 1,
        score: score + 1,
        tail: [{ x: apple.x, y: apple.y }, ...tail],
        apple: { x: 200, y: 200 },
      };
    }

    default:
      throw new Error('Unknow type of action');
  }
};

const useGameReducer = (gameState = defaultGameState) => {
  const [state, dispatch] = useReducer(reducer, gameState);

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
  };

  return [state, actions];
};

export default useGameReducer;
