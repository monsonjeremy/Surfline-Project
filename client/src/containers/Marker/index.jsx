import React, { Component } from 'react';
import { connect } from 'react-redux';

// Views
import MarkerView from '../../components/Marker';

/**
 * @description Marker container connects the markers to the store and passes down relevant state
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

const mapStateToProps = state => ({
  ...state.User,
});

export default connect(mapStateToProps)(Marker);
