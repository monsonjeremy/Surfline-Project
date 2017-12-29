import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import AppView from '../../components/App';

// actions
import { hydrateSession } from '../../reducers/User/actions';

/**
 * @description App container handles logic when mounting the application and
 *              hydrating the application state
 *
 * @param {object} props - Component props
 * @param {object} store - The application state
 * @param {boolean} props.isLoading - True when the application is loading
 *
 * @returns {<App />}
 */
class App extends Component {
  componentWillMount() {
    // Make a call to the session reload API to hydrate the session if a session cookie is present
    this.props.dispatchHydrateSession();
  }

  render() {
    const { store, isLoading, } = this.props;

    return (
      <div>
        {isLoading && <div className="sp-app-loading" />}
        <AppView store={store} />
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    subscribe: PropTypes.func,
    getState: PropTypes.func,
    replaceReducer: PropTypes.func,
    Symbol: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  dispatchHydrateSession: PropTypes.func.isRequired,
};

App.defaultProps = {
  store: {},
  isLoading: false,
};

const mapDispatchToProps = dispatch => ({
  dispatchHydrateSession: () => {
    dispatch(hydrateSession());
  },
});

// eslint-disable-next-line
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
