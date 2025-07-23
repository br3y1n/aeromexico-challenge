import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["__tests__/**/*.test.{ts,tsx,js,jsx}"],
    reporters: ["verbose"],
    coverage: {
      enabled: true,
      provider: "v8",
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.type.{ts,tsx}",
        "src/**/*.interface.{ts,tsx}",
        "src/**/index.ts",
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        statements: 100,
        branches: 100,
      },
      reporter: ["html", "text", "text-summary"],
    },
  },
});
