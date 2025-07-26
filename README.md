# ✈️ Aeromexico Challenge - Rick and Morty Characters

A frontend application built with **Next.js** that displays character data from the **Rick and Morty API**, with options to use either mock data or real API endpoints.

## 🚀 Quick Start

1. **Ensure you have Yarn installed**:

   ```bash
   npm install --global yarn
   ```

2. **Set up the project**:

   ```bash
   git clone https://github.com/br3y1n/aeromexico-challenge.git
   cd aeromexico-challenge
   yarn install
   ```

3. **Launch the application**:

   ```bash
   # For mock data mode (default):
   yarn launch

   # For API mode (external APIs + JSON server):
   yarn launch:all
   ```

## 🏗️ Launch Options

### 🧩 Mock Data Mode (Recommended for development)

```bash
yarn launch
```

- Automatically configures environment variables
- Uses local mock data for all features
- No external dependencies needed
- Includes simulated network delay (200ms)

### 🌐 Full API Mode

```bash
yarn launch:all
```

- Starts both:
  - Next.js development server
  - Local JSON API server (port 8000)
- Connects to:
  - Rick and Morty API for characters
  - Local JSON server for favorites
- Requires internet connection

## 🌍 Environment Configuration

The application automatically handles environment setup, but you can customize these variables:

```env
# API Endpoints
NEXT_PUBLIC_CHARACTER_API=https://rickandmortyapi.com/api
NEXT_PUBLIC_FAVORITE_API=http://localhost:8000

# Data Sources (api | mock)
NEXT_PUBLIC_TARGET_CHARACTERS=mock
NEXT_PUBLIC_TARGET_FAVORITES=mock

# Network Settings
NEXT_PUBLIC_NUMBER_RETRIES_REQUEST=2      # API retry attempts
NEXT_PUBLIC_MOCK_DELAY_RESPONSE_MS=200    # Mock response delay
```

## 🛠️ Development Tools

| Command            | Description                 |
| ------------------ | --------------------------- |
| `yarn dev`         | Standard Next.js dev server |
| `yarn build`       | Create production build     |
| `yarn start`       | Run production build        |
| `yarn test`        | Run Vitest tests            |
| `yarn lint`        | Run ESLint checks           |
| `yarn check-types` | TypeScript validation       |

## ✅ Best Practices

✔️ **Automatic Environment Setup** - No manual .env configuration needed  
✔️ **Clean Architecture** - Separated concerns with feature modules  
✔️ **Type Safety** - Full TypeScript integration  
✔️ **Adaptive Data Layer** - Switch between mock/API without code changes  
✔️ **Network Resilience** - Configurable retry logic for API calls  
✔️ **Realistic Mocks** - Simulated network delays for development

## 📌 Core Technologies

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/) (Latest features)
- [React Query](https://tanstack.com/query/v5/) (Server state management)
- [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- [TypeScript](https://www.typescriptlang.org/) (Type safety)
- [JSON Server](https://github.com/typicode/json-server) (Mock API server)
- [Vitest](https://vitest.dev/) (Blazing fast tests)

## 📂 Project Structure

```bash
src/                   # Root folder containing all application logic
├── app/               # Handles routing and page-level components
├── modules/           # Feature-based modularization for scalability
│   ├── character/     # Character feature module
│   │   ├── adapters/  # Handles API communication and data transformation
│   │   ├── components/ # UI components specific to the feature
│   │   ├── hooks/     # Custom hooks for managing feature-related logic
│   │   ├── repositories/ # Data layer for fetching/storing feature data
│   │   ├── types/     # Type definitions for feature domain
│   │   └── views/     # UI views rendering feature data
└── shared/            # Contains reusable logic and utilities
    ├── components/    # Generic, reusable UI components
    ├── config/        # Global configuration files
    ├── enums/         # Commonly used enumerations
    ├── hooks/         # Reusable custom hooks
    ├── infrastructure/ # API calls, external services, etc.
    ├── providers/     # Context providers for global state management
    ├── stores/        # State management using Zustand
    ├── styles/        # Global styles and theming
    ├── utils/         # Utility functions and helper methods
    ├── wrappers/      # Higher-order components or wrappers
```

## 🏆 Key Features

- **Dual Data Source Support**: Seamless switching between mock and API data
- **Modular Architecture**: Clean separation of concerns
- **Comprehensive Testing**: Vitest for unit and integration tests
- **Developer Experience**: Automatic configuration and realistic mocks
