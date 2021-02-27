const Menu = (props) => {
  const { change } = props;
  return (
    <ul>
      <li onClick={() => change('game')}>New Game</li>
      <li>Options</li>
      <li>Record Table</li>
    </ul>
  );
};

export default Menu;
