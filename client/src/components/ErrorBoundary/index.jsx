import React from 'react';

const ErrorBoundary = () => (
  <div className="error-page">
    <figure className="gone-surfing-icon lrg-icon" />
    <h1 className="main-title">Hmmm, something went wrong..</h1>
    <p className="copy-text">Gone surfing, but you can try refreshing the page!</p>
  </div>
);

export default ErrorBoundary;
