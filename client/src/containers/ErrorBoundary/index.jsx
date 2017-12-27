import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorBoundaryView from '../../components/ErrorBoundary';

/**
 * @description ErrorBoundary contains the logic for when an error occurs within the application.
 *              This component is a fail safe to show an error component rather than a white screen.
 *
 * @param {object} props - Component props
 *
 * @returns {<ErrorBoundary />}
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, });
    console.log('error:', error);
    console.log('info:', info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryView />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ErrorBoundary;
