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
                         <button
                              onClick={() => window.location.reload()}
                              style={{
                                   padding: '0.5rem 1.5rem',
                                   cursor: 'pointer'
                              }}
                         >
                              Refresh Page
                         </button>
                    </div>
               );
          }
          return this.props.children;
     }
}

export default ErrorBoundary;
