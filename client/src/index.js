import React from 'react';
import './index.css';
import { Provider } from './components/Context/Context';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
