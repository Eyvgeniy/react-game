import { useEffect, useState } from 'react';
import Menu from './components/Menu';
import Title from './components/Title';
import Canvas from './components/Canvas';
import useGameReducer from './state/reducer';
import githubImage from './assets/images/gitHub.png';
import rsSchool from './assets/images/rs_school.svg';
import './App.css';

const menuMap = {
  title: Title,
  menu: Menu,
  game: Canvas,
};
function App() {
  const [menu, setMenu] = useState('title');
  const [gameState, actions] = useGameReducer();

  useEffect(() => {
    const keyDown = () => {
      setMenu('menu');
      window.removeEventListener('keydown', keyDown);
    };
    window.addEventListener('keydown', keyDown);
  }, []);

  const CurrentMenu = menuMap[menu];

  return (
    <>
      <div className="App">
        <div className="screen">
          <CurrentMenu change={setMenu} state={gameState} actions={actions} />
        </div>
        <footer>
          <div className="links">
            <div>
              <a href="https://rs.school/js/">
                <img src={githubImage} width="16" alt="github link" />
              </a>
            </div>
            <div className="link">
              <a href="https://github.com/Eyvgeniy">
                <img src={rsSchool} width="32" height="16" alt="github link" />
              </a>
            </div>
          </div>
          <div>
            <p>2021</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
