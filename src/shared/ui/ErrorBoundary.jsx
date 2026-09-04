/**
 * @file ErrorBoundary.jsx
 * @layer shared/ui
 * @description React Error Boundary catching unhandled exceptions in the component tree
 * to prevent complete blank screen crashes and display a recovery interface.
 */

import React, { Component } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from './Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught a runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-lg text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error occurred in this view.'}
            </p>
            <div className="pt-2 flex justify-center">
              <Button variant="primary" size="md" icon={RotateCcw} onClick={this.handleReset}>
                Reload Application
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
