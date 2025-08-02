'use client';
import { useTheme } from '../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  text?: string;
  className?: string;
  overlay?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gradient';
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...',
  className = '',
  overlay = false,
  color = 'blue'
}: LoadingSpinnerProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20'
  };

  const colorClasses = {
    blue: 'border-blue-400',
    green: 'border-green-400',
    purple: 'border-purple-400',
    orange: 'border-orange-400',
    pink: 'border-pink-400',
    gradient: 'border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
  };

  const textClasses = 'text-gray-300';

  const containerClasses = 'flex flex-col items-center justify-center py-12';

  const overlayClasses = overlay     ? 'fixed inset-0 bg-black backdrop-blur-md z-50 flex items-center justify-center'
    : '';

  const renderSpinner = () => {
    const borderClass = colorClasses[color];
    
    return (
      <div className={`${sizeClasses[size]} relative`}>
        {/* Layer 1: Background glow */}
        <div className={`absolute inset-0 rounded-full ${borderClass.replace('border-', 'bg-')} blur-xl opacity-30 animate-pulse`}></div>
        
        {/* Layer 2: Outer ring with glow */}
        <div className={`absolute inset-0 rounded-full border-2 ${borderClass} animate-spin shadow-lg`}></div>
        
        {/* Layer 3: Middle ring with reverse animation */}
        <div className={`absolute inset-1 rounded-full border-2 ${borderClass} animate-spin`} style={{ 
          animationDirection: 'reverse', 
          animationDuration: '1.5s' 
        }}></div>
        
        {/* Layer 4: Inner ring */}
        <div className={`absolute inset-2 rounded-full border ${borderClass} animate-spin`} style={{ 
          animationDuration: '2s' 
        }}></div>
        
        {/* Layer 5: Center dot */}
        <div className={`absolute inset-3 rounded-full ${borderClass.replace('border-', 'bg-')} animate-pulse shadow-lg`}></div>
        
        {/* Layer 6: Floating particles */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${borderClass.replace('border-', 'bg-')} animate-pulse`}
            style={{
              top: '20%',
              left: '20%',
              animationDelay: `${i * 0.3}s`,
              animationDuration: '1.5s',
              transform: `translate(${i * 10}px, ${i * 5}px)`
            }}
          ></div>
        ))}
        
        {/* Layer 7: Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <div
            key={`orbit-${i}`}
            className={`absolute w-1 h-1 rounded-full ${borderClass.replace('border-', 'bg-')} animate-spin`}
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDuration: '3s',
              animationDelay: `${i * 1}s`,
              transformOrigin: '0 0'
            }}
          ></div>
        ))}
      </div>
    );
  };

  const content = (
    <div className={`${containerClasses} ${className}`}>
      {/* Modern animated background */}
      <div className="relative mb-6">
        {/* Gradient glow effect */}
        <div className={`absolute inset-0 rounded-full ${colorClasses[color].replace('border-', 'bg-')} blur-xl opacity-40 animate-pulse`}></div>
        {/* Main spinner */}
        {renderSpinner()}
      </div>
      
      {/* Modern loading text with animation */}
      {text && (
        <div className="text-center">
          <p className={`text-sm font-medium ${textClasses} animate-pulse tracking-wide`}>
            {text}
          </p>
          {/* Modern animated dots */}
          <div className="flex justify-center mt-3 space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${colorClasses[color].replace('border-', 'bg-')} animate-bounce shadow-sm`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className={overlayClasses}>
        <div className="max-w-md w-full mx-4">
          {content}
        </div>
      </div>
    );
  }

  return content;
} 