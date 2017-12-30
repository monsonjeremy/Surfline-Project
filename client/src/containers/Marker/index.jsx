import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// Views
import MarkerView from '../../components/Marker';

// Actions

/**
 * @description Maps contains the logic for rendering single markers and handling the logic for the props of the specific marker
 * @param {object} props - Component props
 *
 * @returns {<Marker />}
 */
class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MarkerView {...this.props} />;
  }
}

Marker.propTypes = {};

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  ...state.User,
});

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
