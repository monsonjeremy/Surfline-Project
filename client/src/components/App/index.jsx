import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

// containers
import { ErrorBoundary, Footer, Modal, BuoyList, Dashboard, Maps, Loader } from '../../containers';

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
        <Loader />
        <div className="sidebar">
          <Modal />
          <Dashboard>
            <BuoyList />
          </Dashboard>
          <Footer />
        </div>
        <Maps />
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
