# News Aggregator - Beyond Creation

A modern news aggregator built with Next.js, TypeScript, Tailwind CSS, and GSAP animations.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with dark mode support
- **Search Functionality**: Real-time search across content, authors, and categories
- **Category Filtering**: Filter news by different categories with emoji icons
- **GSAP Animations**: Smooth animations and transitions throughout the app
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **TypeScript**: Full type safety and better development experience

## 🏗️ Architecture

### Clean Code Principles Applied

#### **DRY (Don't Repeat Yourself)**
- ✅ Shared types in `src/utils/constants.ts`
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
├── app/
│   ├── page.tsx              # Main page (clean and minimal)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Header component
│   ├── SearchSection.tsx     # Search and filter functionality
│   ├── NewsCard.tsx          # Individual news article card
│   ├── NewsGrid.tsx          # Grid layout for articles
│   └── Footer.tsx            # Footer component
├── hooks/
│   ├── useGSAP.ts            # GSAP loading and management
│   └── useNewsAnimations.ts  # Animation logic separation
├── utils/
│   ├── constants.ts          # Shared types and data
│   └── helpers.ts            # Utility functions
└── types/
    └── news.ts               # TypeScript interfaces
```

### Component Separation

#### **Header Component**
- Handles navigation and branding
- Clean, reusable header design
- Proper ref forwarding for animations

#### **SearchSection Component**
- Search input with real-time filtering
- Category filter buttons
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

#### **Constants (`src/utils/constants.ts`)**
- Shared TypeScript interfaces
- Mock data for development
- Category definitions
- Single source of truth for data structures

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
- **Category Selection**: Button press animations
- **Grid Updates**: Staggered card animations

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
