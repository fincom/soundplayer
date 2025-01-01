import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
