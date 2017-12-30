import React from 'react';

/**
 * @description ErrorBoundary component contains the view for the error boundary page that is
 * triggered in the case of the app breaking.
 * 
 * @returns {<ErrorBoundary />}
 */
const ErrorBoundary = () => (
  <div className="error-page">
    <h1 className="main-title">Hmmm, something went wrong..</h1>
    <p className="copy-text">Gone surfing, but you can try refreshing the page!</p>
  </div>
);

export default ErrorBoundary;
