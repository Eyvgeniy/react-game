import './hooks/wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { getStateFromLocalStorage } from './utils/localStorage';

const savedState = getStateFromLocalStorage();

ReactDOM.render(
  <React.StrictMode>
    <App savedState={savedState} />
  </React.StrictMode>,
  document.getElementById('root'),
);
