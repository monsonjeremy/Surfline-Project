/* eslint-disable react/jsx-filename-extension */

// General Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './lib/registerServiceWorker';

// App
import App from './containers/App';

// Lib
import { initStore } from './lib';

// Styles
import './styles/particles.css';

const store = initStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));

registerServiceWorker();
