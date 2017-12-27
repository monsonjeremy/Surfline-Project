import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import reducers from '../reducers';

// Check if we are in dev mode
const isDev = process.env.NODE_ENV !== 'production';

// Create an array of middlewares for redux (thunk & logger)
const middleWares = [];
middleWares.push(thunk);

const loggerMiddleware = createLogger({
  // Only use the logger in dev mode
  predicate: () => isDev,
});

middleWares.push(loggerMiddleware);

// Function to initiate the redux store with reducers and middleware
const initStore = () => createStore(reducers, composeWithDevTools(applyMiddleware(...middleWares)));

export default initStore;
