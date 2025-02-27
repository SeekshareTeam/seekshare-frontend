import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  /**
   * Answer that explains error policy with Apollo excellently:
   * https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
   */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.log('### derived state', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('### did catch', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full h-screen flex items-center justify-centerUserlabel">
          <h1 className="text-nord-0 dark:text-nord-6">{'Something went wrong.'}</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
