import { useState } from 'react';

const Sounds = (props) => {
  const { state, actions } = props;

  return (
    <ul>
      <li>
        <span>Music</span>..............
        <span>ON</span>
      </li>
      <li>
        <input type="range" />
      </li>
      <li>
        <span>Sounds</span>...........
        <span onClick={(e) => actions.changeSoundVolume(0)}>{state.sound.on ? 'On' : 'Off'}</span>
      </li>
      <li>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.05"
          value={state.sound.volume}
          onChange={(e) => actions.changeSoundVolume(e.target.value)}
        />
      </li>
    </ul>
  );
};

export default Sounds;
