# ✈️ Aeromexico Challenge - Rick and Morty Characters

Aeromexico Challenge is a frontend application built with **Next.js**, designed to showcase character data from the public **Rick and Morty API**. The app fetches and displays characters in responsive cards, demonstrating clean architecture, modular design, and UI integration.

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/br3y1n/aeromexico-challenge.git
   cd aeromexico-challenge
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

## 🏗️ Available Scripts

- **Development**

  ```bash
  yarn dev
  ```

  Starts the development server.

- **Build**

  ```bash
  yarn build
  ```

  Generates an optimized production build.

- **Production Run**

  ```bash
  yarn start
  ```

  Runs the application in production mode.

- **Linting**

  ```bash
  yarn lint
  ```

  Checks for linting issues.

- **Fix Linting Issues**

  ```bash
  yarn lint:fix
  ```

  Runs ESLint and automatically fixes errors.

- **Type Checking**

  ```bash
  yarn type-check
  ```

  Runs TypeScript compiler (`tsc`) to check for type errors.

## 🌍 **Environment Variables**

### 🔗 **API Configuration**

```env
NEXT_PUBLIC_API=https://localhost:8000/api
```

- Defines the base URL of the API where requests will be sent.
- All external calls will use this endpoint unless a `TARGET` variable specifies that local data should be used.

### 🎯 **Target Definitions**

These variables indicate whether the data source will be the API or a local dataset.

```env
NEXT_PUBLIC_TARGET_CHARACTERS=local
```

- **Possible values:** `local` (use local data) or `api` (fetch data from the API).
- If set to `local`, the data will be generated or loaded from a mock within the application.
- If set to `api`, `NEXT_PUBLIC_API` will be used as the endpoint to retrieve real-time information.
- Each **target definition** is mapped to a corresponding API path in `shared/infrastructure/api/api-path.enum.ts`, where the actual request will be made.

### 🔄 **Retry Attempts for Failed Requests**

```env
NEXT_PUBLIC_NUMBER_RETRIES_REQUEST=2
```

- Specifies the number of times the application will retry a request in case of failure.
- **Example:** If the API returns a temporary error, it will retry up to the defined number of times.

### ⏳ **Simulating Delay in Local Responses**

```env
NEXT_PUBLIC_LOCAL_DELAY_RESPONSE_MS=2000
```

- Defines the delay time (in milliseconds) for responses when `TARGET` is set to `local`.
- Used to simulate the wait time of a real promise and make the development experience more realistic.
- **Example:** If `NEXT_PUBLIC_LOCAL_DELAY_RESPONSE_MS=2000`, the response will be delayed by 2 seconds before returning local data.

## 🔥 **API Calls and Adapters**

### 📂 **Adapters for API Requests and Responses**

- All API requests and responses are handled through **adapters**, located in the `adapters/` folder.
- Each API response type and the expected format for internal processing are defined in `adapter.type.ts`.
- The adapter transforms the API response into a format suitable for internal use, ensuring clean architecture principles are followed.

### 🔗 **API Path Mapping**

- API endpoints are defined in `shared/infrastructure/api/api-path.enum.ts`.
- Each **target definition** in the environment variables is mapped to a corresponding API path in this file.
- This file centralizes the management of API routes, determining whether data is fetched from local mocks or the external API.
- This separation ensures that endpoint management remains flexible and easy to maintain.

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
    ├── stores/        # State management using Zustand or other libraries
    ├── styles/        # Global styles and theming
    ├── utils/         # Utility functions and helper methods
    ├── wrappers/      # Higher-order components or wrappers
```

## 📌 Technologies Used

- [Next.js](https://nextjs.org/) (Static site generation)
- [React Query](https://tanstack.com/query/) (Asynchronous state management)
- [Axios](https://axios-http.com/) (HTTP client)
- [ESLint](https://eslint.org/) (Code linting)
- [Prettier](https://prettier.io/) (Automatic formatting)
- [TailwindCSS](https://tailwindcss.com/) (Styling)
- [TypeScript](https://www.typescriptlang.org/) (Type safety)

## ✅ Best Practices

✔️ **Clean architecture** based on feature modules.  
✔️ **Adapters** to separate API data from internal domain models.  
✔️ **Target switching** to toggle between local and real data.  
✔️ **Type safety** with TypeScript.  
✔️ **UI components organized by feature**.  
✔️ **100% test coverage** with Vitest.
