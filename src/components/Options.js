import { useState } from 'react';
import Controls from './Controls';
import GameOptions from './GameOptions';
import Sounds from './Sounds';

const map = {
  sound: Sounds,
  controls: Controls,
  game: GameOptions,
};

const Options = (props) => {
  const [state, setState] = useState('sound');
  const CurrentOption = map[state];
  return (
    <div className="options-container">
      <div>
        <button onClick={() => setState('game')}>Game</button>
        <button onClick={() => setState('sound')}>Sounds</button>
        <button onClick={() => setState('controls')}>Controls</button>
      </div>
      <hr />
      <CurrentOption {...props} />
    </div>
  );
};

export default Options;
