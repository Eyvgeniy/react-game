import { useEffect } from 'react';
import sounds from '../game/sounds';

const Menu = (props) => {
  const { change, actions, state } = props;
  const handleNewGame = (e) => {
    change('game');
    actions.newGame();
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
        <h2>Record Table</h2>
      </li>
    </ul>
  );
};

export default Menu;
