import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-itunes-bg flex flex-col items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-itunes-text mb-4">
              Oups ! Une erreur est survenue
            </h1>
            <p className="text-gray-300 mb-6">
              {this.state.error?.message || "Une erreur inattendue s'est produite"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-itunes-accent text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Recharger l'application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
