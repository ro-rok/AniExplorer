# AniExplorer Frontend - Cinematic Case Study

A cinematic single-page case-study website showcasing an ML-powered anime recommendation system. Built as a frontend masterclass featuring an interactive embedding visualization that teaches visitors how the recommendation algorithm works through hands-on exploration.

## 🎯 What This Project Demonstrates

This is not just an anime recommendation app—it's an **educational portfolio piece** that:

- **Teaches ML Concepts Visually**: Interactive embedding network shows how genre weighting affects similarity scores
- **Showcases Premium UI/UX**: Cinematic black theme with GSAP scroll animations and Framer Motion interactions
- **Demonstrates Technical Depth**: Real-time vector math, normalized dot product similarity, and dynamic re-ranking
- **Proves Accessibility Commitment**: WCAG AA compliant with keyboard navigation and screen reader support

## ✨ Features

### Interactive Embedding Network
The centerpiece of this project—a **frontend-only educational simulation** that visualizes how genre-weighted embeddings work:
- **Query Selection**: Switch between three real anime examples (One Piece, Your Lie in April, Terror in Resonance)
- **Baseline/With-Genre Toggle**: Compare pure embedding similarity vs genre-weighted similarity
- **6 Genre Group Sliders**: Adjust weights (0-2 range) for Action/Adventure, Drama/Romance, Comedy/Slice of Life, Fantasy/Sci-Fi, Psychological/Thriller, Horror/Mystery
- **SVG Network Visualization**: Deterministic layout showing Query → Genre Groups → Embedding Vector → Similarity Output with dynamic connection lines
- **Real-Time Computation**: Watch embedding vectors, similarity scores, and recommendations update instantly
- **Before/After Comparison**: See how baseline top-5 differs from with-genre top-5 for each query
- **Preset Configurations**: Try "Shonen Boost", "Romance Night", or "Dark Psychological" presets
- **Educational Value**: Learn how weighted embeddings affect recommendation ranking through hands-on experimentation

**Important**: This is a frontend simulation for educational purposes. The Live Search section uses the real backend API (POST /find_similar) with actual notebook results.

### Live Anime Search
- Real backend integration with FastAPI service
- Search by anime name and media type (TV, Movie, OVA, etc.)
- Beautiful anime cards with images, scores, genres, and similarity metrics
- Comprehensive error handling with retry functionality

### Cinematic Design
- **Black Premium Theme**: True black (#000000) backgrounds with high-contrast typography
- **Smooth Animations**: GSAP scroll-triggered effects and Framer Motion component animations
- **Lenis Smooth Scroll**: Premium inertial scrolling experience
- **Responsive Layout**: Optimized for mobile (320px+), tablet (768px+), and desktop (1024px+)

### Accessibility First
- Semantic HTML landmarks for screen reader navigation
- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Visible focus indicators on all interactive elements
- Respects `prefers-reduced-motion` preference
- Touch-friendly tap targets (44x44px minimum) on mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running (see Backend Setup below)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Place the hero background image**:
   - Add your `bg.jpg` file to the `public/` directory
   - The image should be high-resolution (1920x1080 or larger)
   - Recommended: Anime-themed cinematic background
   - **Exact path**: `frontend/public/bg.jpg`
   - The Hero section will automatically use this image

4. **Configure API connection**:
   Create a `.env.local` file in the frontend directory:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```
   
   - If not set, defaults to `http://localhost:8000`
   - This is used for the Live Search section (real backend API)
   - The Interactive Embedding Network is frontend-only and doesn't require the backend

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

### Backend Setup

The frontend requires the FastAPI backend to be running for live anime search:

1. Navigate to the backend directory (from project root):
   ```bash
   cd ../
   ```

2. Start the FastAPI server:
   ```bash
   python app.py
   ```

3. Backend should be running on `http://localhost:8000`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm test` - Run test suite with Jest
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- --coverage` - Run tests with coverage report

## 🧪 Running Tests

This project includes comprehensive unit tests for critical functionality:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- embeddingMath.test.js
```

### Test Coverage

Tests include:
- **Embedding Math**: Vector normalization, similarity computation, weighted embeddings
- **API Client**: Request/response handling, error states, loading states
- **Component Rendering**: Hero section, navigation, interactive demo
- **Accessibility**: Focus indicators, ARIA labels, keyboard navigation
- **Animation Performance**: Reduced motion preferences

## 📚 What the Interactive Demo Teaches

The **Interactive Embedding Network** is a frontend-only educational simulation that demonstrates:

### Separation: Notebook Results vs Interactive Simulation

- **Notebook Results**: Real backend API results (POST /find_similar) shown in the Live Search section. These are actual results from the trained ML model.
- **Interactive Simulation**: Frontend-only educational demo shown in the Interactive Embedding Network section. This is a simplified, deterministic simulation for learning purposes.

### 1. Genre-Weighted Embeddings
- Each anime is represented as a 12-dimensional vector (one dimension per genre)
- Genre weights amplify or diminish specific dimensions
- Adjusting sliders shows how weights affect the embedding vector in real-time
- Baseline mode uses pure binary vectors (1 if genre present, 0 if not)
- With-genre mode applies weighted boosts based on genre overlap

### 2. Cosine Similarity
- Similarity is computed as the normalized dot product (cosine similarity) of two embedding vectors
- Higher similarity score = more similar anime
- Visual similarity meter and network connections update as you adjust weights

### 3. Dynamic Re-Ranking
- Recommendations are sorted by similarity score
- Changing genre weights recalculates all similarities deterministically
- Watch the recommendation list reorder with smooth animations
- Compare baseline top-5 vs with-genre top-5 in the Before/After table

### 4. Practical ML Intuition
- **Boost Action**: Increase Action/Adventure weight → more action anime recommended
- **Romance Focus**: Increase Drama/Romance weight → romantic anime rise to the top
- **Dark Themes**: Increase Psychological/Thriller weight → darker anime prioritized

### Key Learning Outcomes:
- Understanding how recommendation systems use vector representations
- Seeing the impact of feature weighting on similarity metrics
- Grasping the relationship between embeddings and recommendations
- Appreciating the power of interactive visualization for ML education
- Understanding the difference between baseline (pure similarity) and with-genre (weighted boost) modes

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── bg.jpg                    # Hero background image (YOU MUST ADD THIS)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── sections/             # Page sections (Hero, Problem, Solution, etc.)
│   │   ├── embedding/            # Interactive embedding visualization components
│   │   ├── search/               # Live search components
│   │   ├── results/              # Result display components
│   │   ├── ui/                   # Reusable UI elements (Button, Card, etc.)
│   │   ├── common/               # Common components (Navbar, Footer, etc.)
│   │   ├── hero/                 # Hero section components
│   │   └── model/                # Model showcase components
│   ├── hooks/                    # Custom React hooks
│   │   ├── useEmbeddingCalculation.js
│   │   ├── useAnimeSearch.js
│   │   ├── useScrollspy.js
│   │   ├── useReducedMotion.js
│   │   └── useLenis.js
│   ├── utils/                    # Utility functions
│   │   ├── api.js                # Axios API client
│   │   ├── embeddingMath.js      # Vector math and similarity computation
│   │   ├── mockData.js           # Mock dataset for embedding demo
│   │   ├── animations.js         # GSAP animation presets
│   │   └── constants.js          # Genre lists, presets, theme colors
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── jest.config.js
└── README.md
```

## 🎨 Tech Stack

### Core Framework
- **React 18** - Modern React with hooks and concurrent features
- **Vite 5** - Lightning-fast build tool with HMR
- **JavaScript + JSDoc** - Type annotations via comments

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework with custom black theme
- **PostCSS** - CSS processing with autoprefixer

### Animation Libraries
- **GSAP 3.12** - Professional timeline animations and scroll triggers
- **Framer Motion 11** - React-first animation library for component interactions
- **Lenis 1.1** - Smooth scroll library for premium scrolling experience

### State Management
- **React Hooks** - useState, useEffect, useMemo, useCallback
- No external state library needed (component-local state sufficient)

### HTTP Client
- **Axios 1.6** - Promise-based HTTP client with interceptors

### Testing
- **Jest 29** - Test runner and assertion library
- **React Testing Library 14** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers

### Code Quality
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting

## 🎯 Design and Technical Rationale

### Why a Cinematic Black Theme?

1. **Premium Feel**: Black backgrounds evoke theatrical, high-end experiences
2. **Content Focus**: Dark backgrounds make colorful anime artwork pop
3. **Reduced Eye Strain**: Easier on the eyes in low-light environments
4. **Modern Aesthetic**: Aligns with contemporary design trends (dark mode popularity)
5. **Professional Portfolio**: Demonstrates design sophistication

### Why a Single-Page Layout?

1. **Narrative Flow**: Tells a cohesive story from problem → solution → demo → results
2. **Reduced Friction**: No page loads, seamless scrolling experience
3. **Portfolio Showcase**: Demonstrates frontend skills in one comprehensive view
4. **Performance**: Fewer HTTP requests, faster perceived performance
5. **Engagement**: Encourages visitors to scroll through the entire story

### Why an Interactive Visualization?

1. **Educational Value**: Hands-on learning is more effective than passive reading
2. **Engagement**: Interactive elements increase time-on-site and memorability
3. **Differentiation**: Sets this project apart from typical portfolio pieces
4. **Demonstrates Skill**: Shows ability to build complex, stateful UI components
5. **ML Accessibility**: Makes abstract ML concepts tangible and understandable

### Why SVG Over Canvas?

1. **Accessibility**: SVG elements are part of the DOM, accessible to screen readers
2. **Scalability**: Vector graphics scale perfectly on all screen sizes
3. **Easier Manipulation**: Can use CSS and JS to style/animate individual elements
4. **Debugging**: Inspectable in DevTools, easier to debug than Canvas
5. **Performance**: Sufficient for this use case without Canvas complexity

### Why GSAP + Framer Motion?

1. **GSAP**: Best-in-class for complex timeline animations and scroll-triggered effects
2. **Framer Motion**: Excellent for React component animations and gestures
3. **Complementary**: GSAP for page-level orchestration, Framer Motion for component-level interactions
4. **Performance**: Both libraries are highly optimized for 60fps animations
5. **Developer Experience**: Declarative APIs that integrate well with React

### Why Lenis for Smooth Scroll?

1. **Premium Feel**: Smooth, inertial scrolling feels more polished than native
2. **Cross-Browser**: Consistent experience across all browsers
3. **Lightweight**: Small bundle size (~3KB gzipped)
4. **Customizable**: Fine-tune easing and duration for desired feel
5. **Performance**: GPU-accelerated, doesn't block main thread

### Why Mock Data for Embedding Demo?

1. **Independence**: Demo works without backend, faster load times
2. **Reliability**: No API failures or rate limits
3. **Control**: Can craft dataset to demonstrate specific behaviors
4. **Performance**: Instant updates, no network latency
5. **Educational Focus**: Simplified dataset makes learning easier

### Why Tailwind CSS?

1. **Rapid Development**: Utility-first approach speeds up styling
2. **Consistency**: Design system built-in (spacing, colors, typography)
3. **Performance**: PurgeCSS removes unused styles in production
4. **Customization**: Easy to extend with custom theme values
5. **Maintainability**: No CSS file sprawl, styles co-located with components

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Feature Flags (optional)
VITE_ENABLE_ANIMATIONS=true
VITE_MOCK_API=false
```

### Tailwind Configuration

The `tailwind.config.js` includes custom theme extensions:

- **Colors**: true-black, near-black, off-white, accent colors
- **Fonts**: Bebas Neue (headings), Inter (body)
- **Animations**: fade-in, slide-up, custom keyframes
- **Responsive Breakpoints**: Mobile-first approach

### Vite Configuration

The `vite.config.js` includes:

- React plugin for Fast Refresh
- Path aliases for cleaner imports
- Build optimizations for production

## 🚀 Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. The production build:

- Minifies JavaScript and CSS
- Optimizes images and assets
- Removes unused Tailwind classes
- Generates source maps for debugging
- Outputs a static site ready for deployment

### Deployment

The built site can be deployed to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `dist/` to S3 bucket
- **Any static hosting**: Serve the `dist/` directory

## 🤝 Contributing

1. Follow the existing code style (ESLint + Prettier)
2. Write tests for new features
3. Ensure all tests pass before committing
4. Use semantic commit messages
5. Update documentation for significant changes

## 📝 License

This project is part of the AniExplorer anime recommendation system.

## 🙏 Acknowledgments

- **MyAnimeList API** - Anime data source
- **GSAP** - Professional animation library
- **Framer Motion** - React animation library
- **Lenis** - Smooth scroll library
- **Tailwind CSS** - Utility-first CSS framework

---

**Built with ❤️ as a frontend masterclass and ML education tool**
