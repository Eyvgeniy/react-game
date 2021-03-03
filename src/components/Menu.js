import { useEffect, useState } from 'react';
import sounds from '../game/sounds';

const Menu = (props) => {
  const { change, actions, state } = props;
  const [fullscreen, setFullscreen] = useState(false);
  const handleNewGame = (e) => {
    change('game');
    actions.newGame();
  };
  const handleFullscreen = () => {
    if (fullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      document.getElementById('root').requestFullscreen();
      setFullscreen(true);
    }
  };

  useEffect(() => {
    sounds.musicPlaylist.music.play();
  }, []);
  return (
    <ul>
      <li onClick={handleNewGame}>
        <h2>New Game</h2>
      </li>
      {state.isStart && (
        <li onClick={() => change('game')}>
          <h2>Continue</h2>
        </li>
      )}
      <li onClick={() => change('options')}>
        <h2>Options</h2>
      </li>
      <li>
        <h2 onClick={handleFullscreen}>Full Screen</h2>
      </li>
    </ul>
  );
};

export default Menu;
