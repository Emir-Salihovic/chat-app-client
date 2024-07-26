## Chat-App-Client Documentation

### Introduction

Welcome to the Chat-App-Client project! This documentation will guide you through the installation, setup, and usage of the frontend application built with React and Vite.

---

### Features

- **React** for building user interfaces
- **React Query** for managing server state
- **React Router** for client-side routing
- **Tailwind CSS** for utility-first CSS styling
- **Socket.io Client** for real-time communication
- **ESLint** for code linting
- **TypeScript** for type safety

---

### Installation

1.  **Clone the repository:**
    ```bash
    https://github.com/Emir-Salihovic/chat-app-client.git
    cd chat-app-client
    ```
2.  **Install dependencies:**
    Make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.
        ```bash
        yarn install
        ```

---

### Usage

### Development Mode

To start the development server with hot module replacement:

```ba
yarn dev
```

You can view the application at `http://localhost:3000` (default port).

### Building the App

To build the application for production:

```bash
yarn build
```

The production-ready files will be generated in the `dist` directory.

### Previewing the App

To preview the production build locally:

```bash
yarn preview
```

This will start a local server to preview the built application.

---

### Important Dependencies

- **@tanstack/react-query**: Powerful data synchronization for React.
- **@tanstack/react-query-devtools**: Developer tools for React Query.
- **react**: Library for building user interfaces.
- **react-dom**: Entry point to the DOM for React.
- **react-router-dom**: Declarative routing for React.
- **react-toastify**: Notifications for React applications.
- **socket.io-client**: Real-time engine client library for the web.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Superset of JavaScript that compiles to plain JavaScript.
- **vite**: Next generation frontend tooling.
- **zustand**: Bear necessities for state management in React.
