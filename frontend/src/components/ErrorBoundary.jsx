// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <p className="text-red-600 mb-4">There was an error loading this component.</p>
          <details className="bg-white p-3 rounded border border-red-200">
            <summary className="cursor-pointer font-medium">View Error Details</summary>
            <div className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              <p className="text-sm font-mono text-gray-800">{this.state.error && this.state.error.toString()}</p>
              <pre className="text-xs text-gray-700 mt-2">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          </details>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;