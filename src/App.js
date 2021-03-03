import { useEffect, useState } from 'react';
import Menu from './components/Menu';
import Title from './components/Title';
import Canvas from './components/Canvas';
import Options from './components/Options';
import useGameReducer from './state/reducer';
import githubImage from './assets/images/gitHub.png';
import rsSchool from './assets/images/rs_school.svg';
import fullScreen from './assets/images/full-screen.png';
import './App.css';

const menuMap = {
  title: Title,
  menu: Menu,
  game: Canvas,
  options: Options,
};

function App({ savedState }) {
  const [menu, setMenu] = useState('title');
  const [gameState, actions] = useGameReducer(savedState);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const keyDown = () => {
      setMenu('menu');
      window.removeEventListener('keydown', keyDown);
    };
    console.log(Document.fullscreenElement);
    window.addEventListener('keydown', keyDown);
  }, []);

  const CurrentMenu = menuMap[menu];

  return (
    <>
      <div className="App">
        <div className="screen">
          <CurrentMenu change={setMenu} state={gameState} actions={actions} />
        </div>
        <div className="button">
          <button className="menu-button" onClick={() => setMenu('menu')} />
          <p className="menu-button-label">Menu</p>
        </div>
        <div className="arrow-buttons">
          <button className="button-arrow up">
            <div className="arrow"></div>
          </button>
          <button className="button-arrow down">
            <div className="arrow-down"></div>
          </button>
          <button className="button-arrow right">
            <div className="arrow"></div>
          </button>
          <button className="button-arrow left">
            <div className="arrow"></div>
          </button>
        </div>
        <footer>
          <div className="links">
            <div>
              <a href="https://github.com/Eyvgeniy">
                <img src={githubImage} width="16" alt="github link" />
              </a>
            </div>
            <div className="link">
              <a href="https://rs.school/js/">
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
