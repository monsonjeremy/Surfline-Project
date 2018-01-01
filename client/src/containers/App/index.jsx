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
 * @param {object} props.store - The application state
 * @param {function} props.dispatchHydrateSession - Function for hydrating the session and user data if a session cookie is present
 * @param {object} props.Data - Data object from the store
 * @param {object} props.User - User object from the store
 * @param {object} props.Maps - Maps object from the store
 * @param {boolean} props.isLoading - True when the application is loading
 *
 * @returns {<App />}
 */
class App extends Component {
  componentWillMount() {
    this.props.dispatchHydrateSession();
  }

  render() {
    const { store, } = this.props;

    return <AppView store={store} />;
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
  dispatchHydrateSession: PropTypes.func.isRequired,
};

App.defaultProps = {
  store: {},
};

const mapDispatchToProps = dispatch => ({
  dispatchHydrateSession: () => {
    dispatch(hydrateSession());
  },
});

const mapStateToProps = state => ({
  Data: state.Data,
  User: state.User,
  Maps: state.Maps,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
