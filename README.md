# 🚀 SpaceX Mission Explorer

A modern React application that allows users to explore SpaceX launches with advanced filtering, search capabilities, and favorites management. Built as part of the **Atmosly React Intern Assignment**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Now-green)](https://atmosly-assignment.vercel.app/)
[![SpaceX Mission Explorer](https://img.shields.io/badge/React-19.1.1-blue)](https://atmosly-assignment.vercel.app/) ![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC) ![Testing](https://img.shields.io/badge/Testing-Vitest-4FC08D)

## 🌐 Live Demo

**🔗 [View Live Application](https://atmosly-assignment.vercel.app/)**

Experience the full SpaceX Mission Explorer with real-time data from the SpaceX API, advanced filtering, favorites system, and responsive design.

### 📸 Screenshots

<div align="center">
  <img src="public/Screenshot 2025-09-28 121529.png" alt="SpaceX Mission Explorer - Desktop View" width="80%" />
  <p><em>Desktop view showing the main interface with mission cards, filters, and search functionality</em></p>
</div>

<div align="center">
  <img src="public/Screenshot 2025-09-28 121544.png" alt="SpaceX Mission Explorer - Mobile View" width="60%" />
  <p><em>Mobile responsive view demonstrating the adaptive layout and touch-friendly interface</em></p>
</div>

## 📋 Assignment Overview

This project demonstrates proficiency in:
- **Component-driven React development**
- **State management with Context API**
- **API integration and error handling**
- **Responsive design and accessibility**
- **Testing with React Testing Library**
- **Performance optimization**

## ✨ Features

### 🎯 Core Functionality
- **Browse Launches**: Display SpaceX launches with mission details, dates, rockets, and success status
- **Advanced Search**: Debounced search by mission name with real-time filtering
- **Smart Filtering**: Filter by launch year and success status
- **Favorites System**: Mark/unmark missions as favorites with localStorage persistence
- **Detailed Views**: Comprehensive mission details in modal with rocket information and links
- **Responsive Design**: Optimized for mobile and desktop experiences

### 🎨 User Experience
- **Loading States**: Skeleton loading animations during data fetch
- **Error Handling**: Graceful error states with retry functionality
- **Empty States**: Helpful messaging when no results are found
- **Accessibility**: Keyboard navigation, semantic HTML, and ARIA labels
- **Performance**: Debounced search, memoized components, and efficient rendering

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI framework with modern hooks |
| **Vite** | 7.1.7 | Fast build tool and dev server |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **Vitest** | 3.2.4 | Fast unit testing framework |
| **React Testing Library** | 16.3.0 | Component testing utilities |
| **SpaceX API** | v4 | Real-time launch data |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd atmosly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI

# Code Quality
npm run lint         # Run ESLint
```

## 🏗️ Architecture

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── Badge.jsx       # Status and year badges
│   ├── Filters.jsx     # Search and filter controls
│   ├── LaunchDetails.jsx # Detailed mission view
│   ├── LoadingSkeleton.jsx # Loading state component
│   ├── MissionCard.jsx # Individual mission cards
│   ├── Modal.jsx       # Modal dialog wrapper
│   ├── Pagination.jsx  # Pagination controls
│   ├── SearchInput.jsx  # Debounced search input
│   └── Toggle.jsx      # Toggle switch component
├── context/            # Global state management
│   └── AppContext.jsx  # React Context for app state
├── services/           # API integration
│   └── spacexApi.js   # SpaceX API service
└── __tests__/         # Test files
```

### State Management
- **React Context**: Global state for launches, filters, and favorites
- **useReducer**: Complex state logic with predictable updates
- **localStorage**: Persistent favorites storage
- **Custom Hooks**: Reusable stateful logic

## 🧪 Testing

### Test Coverage
- **Component Tests**: Individual component behavior and interactions
- **Integration Tests**: Full user workflows and state management
- **API Integration**: Mocked SpaceX API responses and error handling

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test -- --watch
```

### Test Files
- `src/components/__tests__/MissionCard.test.jsx` - Mission card component tests
- `src/components/__tests__/Filters.test.jsx` - Filter component tests  
- `src/__tests__/App.test.jsx` - Main application integration tests

## 🎨 Design System

### Styling Approach
- **Tailwind CSS**: Utility-first styling with custom components
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG compliant with semantic HTML
- **Component Design**: Reusable, accessible, and performant

### Key Components
- **MissionCard**: Displays launch information with status badges
- **Filters**: Search and filter controls with debouncing
- **Modal**: Accessible modal for detailed views
- **Pagination**: Efficient navigation through results
- **LoadingSkeleton**: Animated loading states

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (two column layout)
- **Desktop**: > 1024px (three column layout)

### Mobile Optimizations
- Touch-friendly buttons and interactions
- Optimized modal sizing for mobile screens
- Responsive grid layouts
- Accessible form controls

## ⚡ Performance Optimizations

### Implemented Optimizations
- **Debounced Search**: 300ms delay to prevent excessive API calls
- **Memoized Components**: React.memo for expensive components
- **Efficient Filtering**: Client-side filtering with minimal re-renders
- **Pagination**: 12 items per page to maintain performance
- **Lazy Loading**: Modal content loaded on demand

### Future Optimizations
- **Virtual Scrolling**: For large datasets (1000+ launches)
- **Image Optimization**: Lazy loading for mission patches
- **Service Worker**: Offline support and caching
- **Bundle Splitting**: Code splitting for better loading times

## 🚀 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/spacex-mission-explorer)

### Manual Deployment

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

3. **Deploy to Netlify**
   - Connect repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy to GitHub Pages**
   - Use GitHub Actions (see `DEPLOYMENT.md`)

### Environment Variables
No environment variables required - uses public SpaceX API.

### Deployment Files
- `vercel.json` - Vercel configuration
- `DEPLOYMENT.md` - Detailed deployment guide

## 📊 Evaluation Criteria

| Criteria | Points | Status | Implementation |
|----------|--------|--------|----------------|
| **Component Design** | 25 pts | ✅ | Reusable components with clear prop interfaces |
| **State & Data Handling** | 20 pts | ✅ | Context API, API integration, error handling |
| **UX & Responsiveness** | 20 pts | ✅ | Mobile-first, accessible, user-friendly |
| **Code Quality** | 15 pts | ✅ | Clean structure, readable, well-organized |
| **Testing** | 10 pts | ✅ | Comprehensive RTL tests covering main flows |
| **Performance** | 10 pts | ✅ | Debounced search, memoization, efficient renders |

## 🐛 Known Limitations

### Current Limitations
- **No Offline Support**: Requires internet connection for API data
- **Limited Caching**: No persistent cache for API responses
- **No Real-time Updates**: Data refreshed only on page reload
- **Basic Error Recovery**: Limited retry mechanisms for failed requests

### Future Enhancements
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Filtering**: Date ranges, rocket types, launch sites
- **Export Functionality**: CSV/PDF export of filtered results
- **User Accounts**: Persistent favorites across devices
- **Dark Mode**: Theme switching capability

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow ESLint configuration
2. **Testing**: Write tests for new features
3. **Documentation**: Update README for significant changes
4. **Performance**: Consider impact on bundle size and runtime

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is part of the Atmosly React Intern Assignment. All rights reserved.

## 🙏 Acknowledgments

- **SpaceX** for providing the comprehensive public API
- **React Team** for the excellent framework and ecosystem
- **Tailwind CSS** for the utility-first CSS approach
- **Testing Library** for the user-centric testing philosophy
- **Vite** for the fast development experience

## 📞 Contact

For questions about this assignment or the implementation, please reach out through the appropriate channels.

---

**Built with ❤️ for the Atmosly React Intern Assignment**

*Demonstrating modern React development practices, component-driven architecture, and excellent user experience.*