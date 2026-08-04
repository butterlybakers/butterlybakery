import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    this.setState({ info });
    console.error("Caught by ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#222', color: '#ff5555', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1>Something went wrong.</h1>
          <h3>{this.state.error?.toString()}</h3>
          <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
            {this.state.error?.stack}
          </pre>
          <h4>Component Stack:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
            {this.state.info?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Also catch completely unhandled global errors before React mounts
window.addEventListener('error', (e) => {
  document.body.innerHTML = `<div style="padding: 2rem; background: #222; color: #ff5555; min-height: 100vh; font-family: monospace;">
    <h1>Global Window Error</h1>
    <h3>${e.message}</h3>
    <pre>${e.error?.stack}</pre>
  </div>`;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>,
);
