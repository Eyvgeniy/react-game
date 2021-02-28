import { useEffect } from 'react';

const useKeyDown = (change, actions) => {
  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === 'Escape') {
        change('menu');
        return;
      }
      let dx, dy;
      if (e.keyCode === 37) {
        dx = -20;
        dy = 0;
      }
      if (e.keyCode === 38) {
        dx = 0;
        dy = -20;
      }
      if (e.keyCode === 39) {
        dx = 20;
        dy = 0;
      }
      if (e.keyCode === 40) {
        dx = 0;
        dy = 20;
      }
      actions.changeDirection({ dx, dy });
    };

    window.addEventListener('keydown', keyDownHandler, false);
    return () => {
      window.removeEventListener('keydown', keyDownHandler, false);
    };
  });
};

export default useKeyDown;
