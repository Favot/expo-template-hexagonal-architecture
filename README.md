# Expo Template with Hexagonal Architecture

A production-ready React Native template built with Expo, implementing Hexagonal Architecture (also known as Ports and Adapters pattern) for better separation of concerns and maintainability. This template includes multi-brand support, atomic design principles, and various modern development tools and features.

## 📑 Table of Contents

- [Features](#-features)
  - [Architecture & Structure](#architecture--structure)
  - [UI & Styling](#ui--styling)
  - [Development Tools](#development-tools)
  - [State Management & Data Handling](#state-management--data-handling)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Storybook](#-storybook)
- [Maintenance](#-maintenance)
- [Key Dependencies](#-key-dependencies)
- [Best Practices](#-best-practices)
- [Supported Platforms](#-supported-platforms)
- [Security Features](#-security-features)
- [Additional Tools](#-additional-tools)

## 🌟 Features

### Architecture & Structure

- Hexagonal Architecture implementation with clear separation of:
  - Domain layer (core business logic)
  - Gateway layer (external interfaces)
  - Application layer (Expo Router integration)
- Multi-brand support with separate configurations for Brand A and Brand B
- Type-safe development with TypeScript
- Expo Router v4 for type-safe navigation

### UI & Styling

- NativeWind v4 for styling with Tailwind CSS
- Atomic Design pattern with organized component structure:
  - Atoms (basic building blocks)
  - Molecules (composite components)
  - Organisms (complex components)
- Dark and light mode support with ThemeToggle component
- Android Navigation Bar color matching
- Radix UI primitives integration:
  - Progress
  - Tooltip
  - Portal
- Lucide icons for React Native

### Development Tools

- Biome v1.9 for modern code formatting and linting
- Comprehensive testing setup:
  - Jest with Expo preset
  - React Testing Library
  - Jest Native extensions
  - Watch mode and CI configuration
- Storybook v8.3 with multiple addons:
  - On-device actions
  - On-device backgrounds
  - On-device controls
  - On-device notes
- i18next v24 for internationalization

### State Management & Data Handling

- Zustand v4.4 for lightweight state management
- TanStack Query v5.71 for data fetching
- TanStack Form v1.2 for form handling
- Zod v3.24 for schema validation
- Expo Secure Store for secure data storage

## 🚀 Getting Started

1. Create a new project using this template:

```bash
npx create-expo-app@latest --template expo-template-hexagonal-architecture
```

1. Install dependencies:

```bash
cd your-app-name
npm install
```

1. Start the development server:

For Brand A:

```bash
npm run dev:brandA        # For all platforms
npm run dev:brandA:ios    # For iOS
npm run dev:brandA:android # For Android
npm run dev:brandA:web    # For web
```

For Brand B:

```bash
npm run dev:brandB        # For all platforms
npm run dev:brandB:ios    # For iOS
npm run dev:brandB:android # For Android
npm run dev:brandB:web    # For web
```

## 📁 Project Structure

```tree
├── app/          # Application layer with Expo Router
├── components/   # UI components following Atomic Design
│   ├── atoms/    # Basic building blocks
│   ├── molecules/# Composite components
│   └── organismes/# Complex components
├── context/      # React Context definitions
├── domain/       # Business logic and domain entities
├── gateway/      # External interfaces and adapters
├── i18n/         # Internationalization configuration
├── config/       # Brand-specific configurations
└── scripts/      # Development and deployment scripts
```

## 🧪 Testing

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests for CI:

```bash
npm run test:ci
```

## 🎨 Storybook

Generate and run Storybook:

```bash
npm run storybook-generate
```

## 🧹 Maintenance

Clean project (remove node_modules and Expo cache):

```bash
npm run clean
```

## 📦 Key Dependencies

- Expo SDK 52.0.44
- React Native 0.76.7
- React 18.3.1
- NativeWind 4.1.23
- TanStack Query 5.71.5
- Zustand 4.4.7
- i18next 24.2.3
- Biome 1.9.4
- Storybook 8.3.5

## 🎯 Best Practices

- Follows hexagonal architecture principles for better maintainability
- Implements atomic design patterns for component organization
- Multi-brand support with separate configurations
- Type-safe development with TypeScript
- Component-driven development with Storybook
- Comprehensive testing setup with Jest and Testing Library
- Internationalization support out of the box
- Modern styling with Tailwind CSS through NativeWind

## 📱 Supported Platforms

- iOS
- Android
- Web (Expo Web support)

## 🔒 Security Features

- Secure storage implementation with expo-secure-store
- Environment variable management
- Type-safe API integrations

## 🛠 Additional Tools

- Bottom Sheet integration (@gorhom/bottom-sheet)
- Date/Time picker components
- Slider components
- Reanimated for animations
- SVG support
