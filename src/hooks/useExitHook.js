import { useEffect } from 'react';

const useExit = (change) => {
  useEffect(() => {
    const exit = (e) => {
      if (e.key === 'Escape') {
        change('menu');
      }
    };
    window.addEventListener('keydown', exit);
    return () => {
      window.removeEventListener('keydown', exit);
    };
  }, [change]);
};

export default useExit;
