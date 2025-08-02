# News Aggregator - Beyond Creation

A modern news aggregator built with Next.js, TypeScript, Tailwind CSS, and GSAP animations.

## 🚀 Features

- **📰 Multi-Source News**: Fetch articles from The Guardian and The New York Times APIs
- **🌙 Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **🔍 Search Functionality**: Search through articles with real-time filtering
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🎨 Modern UI**: Clean, modern interface with GSAP animations
- **🌐 Internationalization**: Support for English and Arabic with RTL layout
- **📄 Pagination**: Navigate through articles with server-side pagination
- **⚡ Performance**: Optimized loading and caching strategies

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
│   ├── Pagination.tsx     # Pagination controls
│   ├── ClientOnly.tsx     # Client-side only wrapper
│   └── ErrorBoundary.tsx  # Error handling component
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

#### **Footer Component**
- Simple, reusable footer
- Consistent styling with the rest of the app

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

## 🎭 Animations

- **Page Load**: Header slide-in, search section fade-in
- **Card Interactions**: Hover lift and scale effects
- **Search Focus**: Input scaling animations
- **Grid Updates**: Staggered card animations

### Animation Features

- **Smooth Transitions**: GSAP-powered animations throughout the app
- **Hover Effects**: Interactive card hover animations
- **Loading States**: Animated loading spinners and skeletons
- **Theme Transitions**: Smooth dark/light mode switching

## 🛠️ Technical Stack

- **Next.js 15**: App Router with TypeScript
- **React 19**: Latest React features
- **TypeScript**: Full type safety
- **Tailwind CSS v4**: Modern styling
- **GSAP**: Professional animations
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

## 🎯 Best Practices Implemented

- **Component Separation**: Each component has a single responsibility
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized images and animations
- **Accessibility**: Proper ARIA labels and semantic HTML
- **SEO**: Meta tags and proper document structure
- **Error Handling**: Graceful error states and loading indicators

## 🔧 Future Enhancements

- Real API integration (NewsAPI, Guardian, etc.)
- User authentication
- Bookmark functionality
- Share features
- Advanced filtering options
- Offline support with PWA

---

Built with ❤️ for the Beyond Creation frontend challenge
