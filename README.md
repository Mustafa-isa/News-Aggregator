# News Aggregator - Beyond Creation

A modern news aggregator built with Next.js, TypeScript, Tailwind CSS, and GSAP animations.

## 🚀 Features

- **📰 Multi-Source News**: Fetch articles from The Guardian and The New York Times APIs
- **🌙 Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **🔍 Search Functionality**: Search through articles with real-time filtering
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🎨 Modern UI**: Clean, modern interface with GSAP animations
- **🌐 Internationalization**: Support for English and Arabic with RTL layout
- **📄 Enhanced Pagination**: Advanced pagination with progress bar and quick navigation
- **⚡ Performance**: Optimized loading and caching strategies
- **🎭 Advanced Animations**: Smooth GSAP-powered animations and interactions
- **📖 Article Details**: Enhanced article view with responsive design

## 🏗️ Architecture

### Clean Code Principles Applied

#### **DRY (Don't Repeat Yourself)**
- ✅ Reusable utility functions in `src/utils/helpers.ts`
- ✅ Custom hooks for common functionality
- ✅ Component composition to avoid code duplication

#### **KISS (Keep It Simple, Stupid)**
- ✅ Simple, focused components with single responsibilities
- ✅ Clear separation of concerns
- ✅ Minimal dependencies
- ✅ Straightforward state management

#### **SOLID Principles**
- ✅ **Single Responsibility**: Each component has one clear purpose
- ✅ **Open/Closed**: Components are extensible without modification
- ✅ **Interface Segregation**: Clean, focused interfaces
- ✅ **Dependency Inversion**: Dependencies injected through props

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── news/[id]/         # Dynamic article pages
├── components/             # Reusable UI components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   ├── NewsCard.tsx       # Article card component
│   ├── NewsGrid.tsx       # Grid layout for articles
│   ├── SearchSection.tsx  # Search functionality
│   ├── Pagination.tsx     # Enhanced pagination controls
│   ├── LoadingSpinner.tsx # Advanced loading component
│   ├── LoadingState.tsx   # Page loading state
│   ├── CreatedBy.tsx      # Animated creator credit
│   ├── ClientOnly.tsx     # Client-side only wrapper
│   ├── ErrorBoundary.tsx  # Error handling component
│   └── Article/           # Article-related components
│       ├── Article.tsx    # Main article display component
│       └── PageHeader.tsx # Article page header
├── contexts/              # React Context providers
│   ├── ThemeContext.tsx   # Dark/light theme state
│   └── LanguageContext.tsx # i18n language state
├── hooks/                 # Custom React hooks
│   ├── useNewsService.ts  # News data management
│   ├── useNewsAnimations.ts # GSAP animations
│   └── useGSAP.ts         # GSAP integration
├── services/              # API and data services
│   ├── NewsService.ts     # Main service orchestrator
│   └── providers/         # API provider implementations
│       ├── GuardianProvider.ts
│       ├── NYTProvider.ts
│       └── NewsAPIProvider.ts
├── types/                 # TypeScript type definitions
│   ├── api.ts            # API interfaces
│   └── news.ts           # News-specific types
├── utils/                 # Utility functions
│   ├── helpers.ts        # Helper functions
│   └── translations.ts   # i18n translations
└── config/               # Configuration files
    └── providers.ts      # API provider configuration
```

### Component Separation

#### **Header Component**
- Handles navigation and branding
- Clean, reusable header design
- Proper ref forwarding for animations

#### **SearchSection Component**
- Search input with real-time filtering
- Clean prop interface for event handling

#### **NewsCard Component**
- Individual article display
- Image handling with Next.js Image
- Hover animations and interactions

#### **NewsGrid Component**
- Grid layout management
- Loading and empty states
- Responsive design handling

#### **Pagination Component**
- Enhanced pagination with progress bar
- Quick navigation to first/last page
- Loading states and smooth animations
- Responsive design for all screen sizes

#### **LoadingSpinner Component**
- Advanced multi-layer loading animation
- Dark theme optimized
- Customizable sizes and colors
- Overlay and inline modes

#### **Article Component**
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Image Optimization**: Responsive image sizing and loading
- **Typography Scaling**: Adaptive text sizes for all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Performance**: Optimized image loading with priority and sizes

#### **PageHeader Component**
- Clean article page navigation
- Consistent branding and styling
- Sticky positioning for better UX

#### **LoadingState Component**
- Dedicated loading state for article pages
- Theme-aware styling
- Consistent with app design system

#### **CreatedBy Component**
- Animated creator credit with GSAP
- Scroll-triggered animations
- Hover interactions and effects

#### **Footer Component**
- Simple, reusable footer
- Consistent styling with the rest of the app
- Animated creator credit integration

### Custom Hooks

#### **useGSAP Hook**
- Manages GSAP loading and initialization
- Prevents hydration issues
- Provides clean interface for animations

#### **useNewsAnimations Hook**
- Centralizes all animation logic
- Separates concerns from UI components
- Provides reusable animation handlers

### Utility Functions

#### **Helpers (`src/utils/helpers.ts`)**
- Date formatting utilities
- Article filtering logic
- Reusable functions following DRY principle

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient design
- **Glass Morphism**: Backdrop blur effects
- **Smooth Transitions**: CSS and GSAP animations
- **Dark Mode**: Automatic dark mode support
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Enhanced Loading States**: Multi-layer animated spinners
- **Mobile-First Design**: Optimized for all device sizes

## 🎭 Animations

- **Page Load**: Header slide-in, search section fade-in
- **Card Interactions**: Hover lift and scale effects
- **Search Focus**: Input scaling animations
- **Grid Updates**: Staggered card animations
- **Pagination**: Smooth transitions and hover effects
- **Loading States**: Advanced multi-layer spinner animations
- **Creator Credit**: Scroll-triggered and hover animations

### Animation Features

- **Smooth Transitions**: GSAP-powered animations throughout the app
- **Hover Effects**: Interactive card hover animations with scale transforms
- **Loading States**: Advanced animated loading spinners with multiple layers
- **Theme Transitions**: Smooth dark/light mode switching
- **Button Interactions**: Scale and shadow effects on interaction
- **Scroll Animations**: Triggered animations for better engagement

## 🛠️ Technical Stack

- **Next.js 15.4.4**: App Router with TypeScript
- **React 19.1.0**: Latest React features
- **TypeScript 5**: Full type safety
- **Tailwind CSS v4.1.11**: Modern styling
- **GSAP 3.13.0**: Professional animations
- **Turbopack**: Fast development builds

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

## 📱 Responsive Design

- **Mobile**: Single column layout with touch-friendly interactions
- **Tablet**: Two-column grid layout
- **Desktop**: Three-column grid with hover effects
- **Enhanced Pagination**: Responsive pagination with mobile-optimized controls
- **Article View**: Fully responsive article display with adaptive typography

### Responsive Features

- **Adaptive Typography**: Text scales appropriately for each screen size
- **Flexible Layouts**: Components adapt to available space
- **Touch Optimization**: Larger touch targets on mobile devices
- **Image Optimization**: Responsive images with appropriate sizing
- **Performance**: Optimized loading for different screen sizes

## 🎯 Best Practices Implemented

- **Component Separation**: Each component has a single responsibility
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized images and animations
- **Accessibility**: Proper ARIA labels and semantic HTML
- **SEO**: Meta tags and proper document structure
- **Error Handling**: Graceful error states and loading indicators
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Code Organization**: Clean folder structure with logical separation

## 🔧 Configuration

### Next.js Configuration
- **Image Optimization**: Remote patterns configured for multiple image sources
- **TypeScript**: Build errors ignored for development flexibility
- **Performance**: Optimized for fast loading and rendering

### Tailwind CSS
- **Custom Configuration**: Optimized for the project's design system
- **Responsive Utilities**: Mobile-first responsive design
- **Dark Mode**: Automatic dark mode support

## 🔧 Future Enhancements

- Real API integration (NewsAPI, Guardian, etc.)
- User authentication and personalization
- Bookmark and favorite functionality
- Social sharing features
- Advanced filtering and sorting options
- Offline support with PWA capabilities
- Advanced search with filters and categories
- Article reading progress tracking
- Related articles suggestions

---

Built with ❤️ for the Beyond Creation frontend challenge
