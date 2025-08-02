'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, errorInfo }: { error?: Error; errorInfo?: ErrorInfo }) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const containerClasses = theme === 'dark'
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4"
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4";

  const cardClasses = theme === 'dark'
    ? "text-center bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700 max-w-md w-full"
    : "text-center bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200 max-w-md w-full";

  const iconClasses = theme === 'dark'
    ? "text-6xl mb-6 animate-pulse"
    : "text-6xl mb-6 animate-pulse";

  const titleClasses = theme === 'dark'
    ? "text-2xl font-bold text-white mb-4"
    : "text-2xl font-bold text-gray-900 mb-4";

  const subtitleClasses = theme === 'dark'
    ? "text-lg text-gray-300 mb-6"
    : "text-lg text-gray-600 mb-6";

  const errorTextClasses = theme === 'dark'
    ? "text-sm text-gray-400 mb-6 p-4 bg-gray-900/50 rounded-lg font-mono text-left"
    : "text-sm text-gray-500 mb-6 p-4 bg-gray-100/50 rounded-lg font-mono text-left";

  const buttonClasses = theme === 'dark'
    ? "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
    : "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105";

  const secondaryButtonClasses = theme === 'dark'
    ? "px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ml-3"
    : "px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ml-3";

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        {/* Animated Error Icon */}
        <div className={iconClasses}>
          <div className="relative">
            <span className="animate-bounce">⚠️</span>
            <div className="absolute inset-0 animate-ping opacity-20">⚠️</div>
          </div>
        </div>

        {/* Error Title */}
        <h1 className={titleClasses}>
          {t('errors.somethingWentWrong')}
        </h1>

        {/* Error Subtitle */}
        <p className={subtitleClasses}>
          {t('errors.unknownError')}
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className={errorTextClasses}>
            <div className="font-semibold mb-2">Error Details:</div>
            <div className="text-red-400">{error.message}</div>
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-gray-400 hover:text-gray-300">
                  Stack Trace
                </summary>
                <pre className="text-xs mt-2 text-gray-500 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              </details>
            )}
            {errorInfo && (
              <details className="mt-2">
                <summary className="cursor-pointer text-gray-400 hover:text-gray-300">
                  Component Stack
                </summary>
                <pre className="text-xs mt-2 text-gray-500 overflow-auto max-h-32">
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleReload}
            className={buttonClasses}
          >
            🔄 {t('errors.reloadPage')}
          </button>
          <button
            onClick={handleGoHome}
            className={secondaryButtonClasses}
          >
            🏠 Go Home
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-xs text-gray-500">
          <p>If the problem persists, try:</p>
          <ul className="mt-2 space-y-1 text-left">
            <li>• Clearing your browser cache</li>
            <li>• Checking your internet connection</li>
            <li>• Refreshing the page</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 