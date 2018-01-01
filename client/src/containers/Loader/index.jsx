import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoaderView from '../../components/Loader';

/**
 * @description Loader contains the logic for connecting the loading component to the store and conditionally rendering it.
 *
 * @param {object} props - Component props
 *
 * @returns {<Loader />}
 */
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Data, User, Maps, } = this.props;
    const isLoading =
      !!Data.buoy.isLoading || !!Data.isLoading || !!Maps.isLoading || !!User.isLoading;

    if (isLoading) {
      return <LoaderView />;
    }

    return null;
  }
}

Loader.propTypes = {
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

const mapStateToProps = state => ({
  Data: state.Data,
  User: state.User,
  Maps: state.Maps,
});

export default connect(mapStateToProps)(Loader);
