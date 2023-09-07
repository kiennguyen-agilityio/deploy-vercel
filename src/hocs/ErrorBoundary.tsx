import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Returns the derived state from an error.
   * @returns {State} The updated state object.
   */
  static getDerivedStateFromError(): State {
    // Set the hasError property to true in the state object.
    return { hasError: true };
  }

  /**
   * Handles errors thrown by the component.
   * @param {Error} error - The error object.
   * @param {ErrorInfo} info - Additional information about the error.
   * @returns {void}
   */
  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log the error
    console.log(error);

    // Log additional information about the error
    console.log(info);
  }

  /**
   * Render the component.
   * @returns JSX.Element
   */
  render() {
    // Get the hasError value from the component state
    const { hasError } = this.state;
    // Get the children and fallback props
    const { children, fallback } = this.props;

    // If hasError is true, return the fallback component
    if (hasError) {
      return fallback;
    }

    // Otherwise, return the children components
    return children;
  }
}

export default ErrorBoundary;
