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
        const button = document.querySelector('.button-arrow.left');
        button.classList.toggle('active');
        setTimeout(() => button.classList.toggle('active'), 100);
      }
      if (e.keyCode === 38) {
        dx = 0;
        dy = -20;
        const button = document.querySelector('.button-arrow.up');
        button.classList.toggle('active');
        setTimeout(() => button.classList.toggle('active'), 100);
      }
      if (e.keyCode === 39) {
        dx = 20;
        dy = 0;
        const button = document.querySelector('.button-arrow.right');
        button.classList.toggle('active');
        setTimeout(() => button.classList.toggle('active'), 100);
      }
      if (e.keyCode === 40) {
        dx = 0;
        dy = 20;
        const button = document.querySelector('.button-arrow.down');
        button.classList.toggle('active');
        setTimeout(() => button.classList.toggle('active'), 100);
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
