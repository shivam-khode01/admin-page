import React, { Component } from 'react';
import PropTypes from 'prop-types'; // Add this import if using PropTypes

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Optionally, log to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>{this.props.fallbackMessage || "Something went wrong."}</h1>
          {/* You can also add more UI here, like a button to refresh or contact support */}
        </div>
      );
    }
    return this.props.children;
  }
}

// Optional: Define prop types
ErrorBoundary.propTypes = {
  fallbackMessage: PropTypes.string, // Accepts an optional custom error message
  children: PropTypes.node.isRequired, // Ensures children are provided
};

export default ErrorBoundary;
