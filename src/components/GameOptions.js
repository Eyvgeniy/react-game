import { useState } from 'react';
const GameOptions = (props) => {
  const { state, actions } = props;

  const handleSpeed = () => {
    if (state.speed === 5) {
      actions.changeSpeed(1);
    } else {
      actions.changeSpeed(state.speed + 1);
    }
  };
  return (
    <ul>
      <li>Dificulty......................Norma or Hard</li>
      <li>
        Speed......................<span onClick={handleSpeed}>{state.speed}</span>
      </li>
      <li>
        <span>Snake color</span>........<input type="color"></input>
      </li>
      <li>
        <span>Apple color</span>........<input type="color"></input>
      </li>
    </ul>
  );
};

export default GameOptions;
