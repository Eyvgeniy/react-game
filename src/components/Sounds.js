import { useState } from 'react';

const Sounds = (props) => {
  const { state, actions } = props;

  return (
    <ul>
      <li>Music</li>
      <li>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.05"
          value={state.music}
          onChange={(e) => actions.changeMusicVolume(e.target.value)}
        />
      </li>
      <hr />
      <li>Sounds</li>
      <li>
        {/* <input
          type="range"
          min="0"
          max="0.5"
          step="0.05"
          value={state.sound}
          onChange={(e) => actions.changeSoundVolume(e.target.value)}
        /> */}
      </li>
    </ul>
  );
};

export default Sounds;
