import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

// containers
import { ErrorBoundary, NavBar, Modal } from '../../containers';
// import ErrorBoundary from '../../containers/ErrorBoundary';
// import NavBar from '../../containers/NavBar';
// import Modal from '../../containers/Modal';

/**
 * @description App component represents Surfline Project application
 *
 * @param {object} store - The application state
 *
 * @returns {<App />}
 */
const App = ({ store, }) => (
  <Provider store={store}>
    <ErrorBoundary>
      <div className="app">
        <Modal />
        <NavBar />
      </div>
    </ErrorBoundary>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    subscribe: PropTypes.func,
    getState: PropTypes.func,
    replaceReducer: PropTypes.func,
    Symbol: PropTypes.func,
  }).isRequired,
};

App.defaultProps = {
  store: {},
};

export default App;
