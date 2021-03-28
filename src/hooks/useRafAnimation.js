import { useEffect } from 'react';

const startSpeed = 150;
const useRafHook = (loop, speed) => {
  useEffect(() => {
    let startTime = 0,
      currentTime = 0,
      time = 0,
      id;

    if (speed === null) {
      return;
    }
    const render = () => {
      if (startTime === 0) {
        startTime = new Date().getTime();
      }
      currentTime = new Date().getTime();
      time = currentTime - startTime;

      id = window.requestAnimationFrame(render);
      if (time > startSpeed / speed) {
        startTime = 0;
        loop();
      }
    };

    render();
    return () => {
      window.cancelAnimationFrame(id);
    };
  });
};

export default useRafHook;
