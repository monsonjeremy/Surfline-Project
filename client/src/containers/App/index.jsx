import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import AppView from '../../components/App';
import Loader from '../../components/Loader';

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
    const { store, Data, User, Maps, } = this.props;
    const isLoading = Data.buoy.isLoading || Maps.isLoading || User.isLoading;

    return (
      <Fragment>
        {isLoading && <Loader />}
        <AppView store={store} />
      </Fragment>
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
  dispatchHydrateSession: PropTypes.func.isRequired,
  Data: PropTypes.shape({
    buoy: PropTypes.shape({
      isLoading: PropTypes.bool,
    }),
  }).isRequired,
  User: PropTypes.shape({
    isLoading: PropTypes.bool,
  }).isRequired,
  Maps: PropTypes.shape({
    isLoading: PropTypes.bool,
  }).isRequired,
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

const mapStateToProps = state => ({
  Data: state.Data,
  User: state.User,
  Maps: state.Maps,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
