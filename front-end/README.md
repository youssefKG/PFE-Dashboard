# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# E-commerce Front-end Structure

```
front-end/
├── src/
│   ├── api/                    # API configuration
│   │   ├── axios.ts           # Axios instance
│   │   └── endpoints.ts       # API endpoints
│   │
│   ├── components/            # Reusable components
│   │   ├── common/           # Shared components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── Table/
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   │
│   │   └── features/         # Feature components
│   │       ├── auth/
│   │       ├── products/
│   │       ├── categories/
│   │       └── cart/
│   │
│   ├── pages/                # Page components
│   │   ├── auth/            # Auth pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ForgotPassword.tsx
│   │   │
│   │   ├── shop/            # Shop pages
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── Categories.tsx
│   │   │   └── Cart.tsx
│   │   │
│   │   └── admin/           # Admin pages
│   │       ├── Dashboard.tsx
│   │       ├── Products.tsx
│   │       ├── Categories.tsx
│   │       └── Orders.tsx
│   │
│   ├── services/            # API services
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── category.service.ts
│   │   └── order.service.ts
│   │
│   ├── types/               # TypeScript types
│   │   ├── auth.types.ts
│   │   ├── product.types.ts
│   │   ├── category.types.ts
│   │   └── order.types.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── helpers.ts
│   │   └── validation.ts
│   │
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
│
├── public/                 # Static files
├── .env                    # Environment variables
├── index.html             # HTML template
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Features

### 1. Authentication
- Login
- Register
- Forgot Password

### 2. Shop
- Product browsing
- Category filtering
- Shopping cart
- Order management

### 3. Admin
- Product management
- Category management
- Order management
- User management

## Key Components

### Common Components
- Button
- Input
- Card
- Table

### Layout Components
- Header
- Footer
- Sidebar

### Feature Components
- Auth forms
- Product cards
- Category lists
- Cart items

## Services
- Auth service
- Product service
- Category service
- Order service

## Types
- Auth types
- Product types
- Category types
- Order types
