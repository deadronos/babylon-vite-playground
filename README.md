# babylon-vite-playground

A modern Babylon.js playground built with Vite, Vitest, and TypeScript.

## Features

- 🎮 **Babylon.js 8.33.0** - Latest version for 3D graphics
- ⚡ **Vite 7.1.12** - Fast development server and build tool
- 🧪 **Vitest 4.0.2** - Modern unit testing framework
- 📘 **TypeScript 5.9.3** - Type-safe development
- 🎨 Basic 3D scene with sphere and ground
- 📦 Modern ES modules
- ✅ Test coverage with Vitest

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Testing

Run tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Project Structure

```
babylon-vite-playground/
├── src/
│   ├── main.ts          # Main application and Babylon.js scene
│   └── main.test.ts     # Unit tests
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## License

ISC

