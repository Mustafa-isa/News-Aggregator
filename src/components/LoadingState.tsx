'use client';
import { useTheme } from '../contexts/ThemeContext';

export default function LoadingState() {
  const { theme } = useTheme();

  const loadingContainerClasses = theme === 'dark'
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center"
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center";

  const loadingCardClasses = theme === 'dark'
    ? "text-center bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-700"
    : "text-center bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200";

  const loadingSpinnerClasses = theme === 'dark'
    ? "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"
    : "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4";

  const loadingTextClasses = theme === 'dark'
    ? "text-gray-300"
    : "text-gray-700";

  return (
    <div className={loadingContainerClasses}>
      <div className={loadingCardClasses}>
        <div className={loadingSpinnerClasses}></div>
        <p className={loadingTextClasses}>Loading article...</p>
      </div>
    </div>
  );
} 