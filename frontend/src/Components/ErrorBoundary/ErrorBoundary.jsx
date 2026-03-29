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
          console.error('ErrorBoundary caught:', error, errorInfo);
     }

     render() {
          if (this.state.hasError) {
               return (
                    <div style={{
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         justifyContent: 'center',
                         minHeight: '60vh',
                         textAlign: 'center',
                         padding: '2rem'
                    }}>
                         <h2>Something went wrong</h2>
                         <p style={{ color: '#666', marginBottom: '1rem' }}>
                              An unexpected error occurred.
                              Please try refreshing the page.
                         </p>
                         <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                              <button
                                   onClick={() => window.location.reload()}
                                   style={{
                                        padding: '0.5rem 1.5rem',
                                        cursor: 'pointer',
                                        backgroundColor: 'var(--primary-color, #2563eb)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px'
                                   }}
                              >
                                   Refresh Page
                              </button>
                              <button
                                   onClick={() => window.location.href = '/'}
                                   style={{
                                        padding: '0.5rem 1.5rem',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        color: 'var(--primary-color, #2563eb)',
                                        border: '1px solid var(--primary-color, #2563eb)',
                                        borderRadius: '6px'
                                   }}
                              >
                                   Go Home
                              </button>
                         </div>
                    </div>
               );
          }
          return this.props.children;
     }
}

export default ErrorBoundary;
