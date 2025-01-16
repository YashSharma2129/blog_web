# Modern Blog Application

A responsive and interactive blog application built with React, Tailwind CSS, and modern web technologies.

## Features

- 🌓 Dark/Light mode with system preference detection
- 📱 Responsive design for all devices
- ♾️ Infinite scroll for posts
- 💬 Nested comments with replies
- 🎯 Optimistic updates for likes and comments
- 🎨 Modern UI with animations
- 🔄 Real-time updates
- 📤 Post sharing functionality

## Tech Stack

- React 18
- Tailwind CSS
- Framer Motion
- Shadcn/ui
- TypeScript
- Vite

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YashSharma2129/blog-app.git
cd blog-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
└── styles/           # Global styles and Tailwind config
```

## Component Architecture

### Reusable Components Approach

1. **Atomic Design Pattern**
   - Built small, self-contained components
   - Composed larger components from smaller ones
   - Used TypeScript for better type safety

2. **Component Organization**
   - UI components in `components/ui`
   - Feature components in respective folders
   - Shared hooks in `hooks` directory

3. **State Management**
   - Used React hooks for local state
   - Custom hooks for shared logic
   - LocalStorage for persistence

### Data Fetching Strategy

1. **Custom Hooks**
   - `usePosts` for post management
   - `useComments` for comment handling
   - Separation of concerns

2. **Optimistic Updates**
   - Immediate UI updates
   - Background synchronization
   - Error handling and rollback

3. **Performance**
   - Infinite scroll implementation
   - Debounced API calls
   - Efficient re-renders

## Development Practices

- ESLint for code quality
- Consistent code formatting
- Component-driven development
- Responsive design first
- Accessibility considerations

## License

MIT
