/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1 data-testid="errorboundary">
          Something went wrong. Component could not be rendered.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
