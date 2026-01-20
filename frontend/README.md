# AniExplorer Frontend

A modern React frontend for the AniExplorer anime recommendation system, built with Vite, Tailwind CSS, and modern animation libraries.

## Features

- **Modern UI Framework**: Built with React 18 and Vite for fast development
- **Responsive Design**: Tailwind CSS for utility-first styling
- **Animation Libraries**: GSAP and Framer Motion for smooth animations
- **Smooth Scrolling**: Lenis integration for enhanced user experience
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Testing**: Jest and React Testing Library for comprehensive testing
- **Code Quality**: ESLint and Prettier for consistent code formatting

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional animation library
- **Framer Motion** - React animation library
- **Lenis** - Smooth scrolling library
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **ESLint & Prettier** - Code quality tools

## Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Project Structure

```
src/
├── components/
│   └── layout/
│       └── Layout.jsx
├── utils/
│   ├── animations.js
│   └── constants.js
├── App.jsx
├── main.jsx
├── index.css
└── setupTests.js
```

## Configuration Files

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `jest.config.js` - Jest testing configuration
- `.eslintrc.cjs` - ESLint configuration
- `.prettierrc` - Prettier configuration

## Backend Integration

The frontend connects to a Flask backend API running on `http://127.0.0.1:5000` with the following endpoints:

- `GET /` - Health check
- `POST /find_similar` - Get anime recommendations

## Development Guidelines

- Use Tailwind utility classes for styling
- Follow React hooks patterns
- Write tests for new components
- Ensure accessibility compliance
- Use semantic HTML elements
- Follow the established file structure

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run the test suite:

```bash
npm test
```

Tests include:
- Component rendering tests
- User interaction tests
- Accessibility tests
- Property-based tests (when implemented)

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Ensure all tests pass
4. Run linting before committing
5. Use semantic commit messages