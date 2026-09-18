# SBA-Recipe-Discovery

## 📋 SBA Objective

This project is a Single Page Application (SPA) for recipe discovery, developed as part of the Per Scholas program. The application uses TheMealDB API to browse categories, search recipes, view recipe details, and manage a favorites list.

The base requirements included:

- Use `useState` + `useEffect` for API calls
- Handle loading and error states
- Custom hooks (`useFetch`, `useLocalStorage`)
- Context API for favorites with localStorage persistence
- Routing with React Router
- Reusable components (Navbar, RecipeCard, Spinner, ErrorMessage)
- Responsive, clean, and consistent UI

---

## ✨ What I Implemented

This project was built iteratively, refactoring multiple times as I progressed to improve readability and maintainability. During development, design decisions were made that differ from the base requirements but proved more satisfying because they utilized more of the API than originally requested:

### Key Design Decisions

1. **`FavoritesContext` with complete `Meal[]` objects** — Instead of managing an array of IDs (`string[]`) with separate `addFavorite(id)`/`removeFavorite(id)` functions, the implementation uses a full `Meal[]` array with a single `toggleFavorite(recipe)` function. This simplified the favorites logic and reduced context calls.

2. **`useFetch` with `{query, type}` parameters** — Rather than accepting just a URL, the custom `useFetch` hook accepts an object with `query` and `type`, centralizing all API calls in one place with a `switch` statement handling every query type. This makes API calls more declarative and organized, and allows the application to leverage far more endpoints from TheMealDB than initially required.

3. **Visual design with DaisyUI + Tailwind CSS** — Maximized use of DaisyUI components (`btn`, `card`, `drawer`, `join`, `embed-responsive`, etc.) combined with Tailwind utilities to create an attractive and responsive interface.

4. **`HashRouter` instead of `BrowserRouter`** — Since GitHub Pages serves static content, `HashRouter` was used to ensure routing works correctly without server configuration.

5. **Embedded video with URL conversion** — YouTube videos returned by the API use `watch?v=` URLs that don't work in an `<iframe>`. A `getEmbedUrl()` helper was implemented to automatically convert URLs to the embedded format (`youtube.com/embed/`).

6. **Additional pages** — Routes beyond the base requirements were added: `/ingredients` (ingredient list), `/ingredients/:ingredient` (recipes by ingredient), and a `ByIngredient` component that functions similarly to `Category`.

7. **`ErrorHandler` with custom error classes** — A `src/ErrorHandling/` folder was created with typed error classes (`FetchError`, `NotFoundError`, `NetworkError`) that extend `Error`. This allows for more descriptive and structured error handling across the application.

8. **File organization by functionality** — Files are organized into folders by responsibility: `CustomHooks/` for hooks, `contextsAndProviders/` for contexts, `Components/` for reusable components, `Layout/` for app structure, `Layout/Body/` for pages, and `ErrorHandling/` for error management. This makes it easier to locate and maintain each file.

9. **404 error page** — A catch-all route (`path="*"`) was added to display a custom 404 page when someone visits an invalid URL. It uses the same Layout template as all other pages (NavBar + content) and features a centered image from `https://http.cat/404`.

### Improvements and Learnings

- The project was refactored multiple times during development to improve code readability
- A hybrid approach was used between vanilla TypeScript patterns and fetch calls from a previous project, resulting in a cleaner and more natural style
- `useContext` is now better understood after this project, allowing all application data to be managed centrally and efficiently
- DaisyUI components were explored extensively, taking full advantage of their attributes to achieve the desired interface
- Working with OpenCode as a development assistant significantly optimized implementation time, helped understand complex architectures, and made resolving errors more immediate and satisfying

---

## 🛠️ Tech Stack

- **React 19** with **TypeScript**
- **Vite** as bundler and dev server
- **Tailwind CSS 4** with `@tailwindcss/vite`
- **DaisyUI 5** for UI components
- **React Router DOM 7** with `HashRouter`
- **react-spinners** (`PacmanLoader`) for loading animations
- **HTML5** + **CSS3** with responsive styling

---

## 🚀 Deployment

Deployment will be done when a hosting URL is available. `HashRouter` is currently used for compatibility with static hosting.

**Deployment URL:** [here](https://chadgarc.github.io/SBA10-Recipe-Discovery/)

---

## 📁 Project Structure

```
src/
├── CustomHooks/          # Custom hooks
│   ├── FetchData.tsx     # Async fetch functions for the API
│   ├── useFetch.tsx      # Reusable hook for API data
│   └── useLocalStorage.ts # Hook for localStorage persistence
├── contextsAndProviders/ # React global contexts
│   ├── DataContext.tsx   # Context for recipe data
│   ├── FavoritesContext.tsx # Context for favorites
│   ├── Providers.tsx     # Provider wrapper
│   └── ErrorHandler.ts   # Custom error classes
├── Components/           # Reusable components
│   ├── NavBar/           # Navigation bar
│   ├── RecipesPresentation/ # Recipe cards
│   ├── RecipeDetails/    # Detail components
│   ├── Loading.tsx       # Loading spinner
│   └── LetterPagination.tsx # A-Z letter pagination
├── Layout/               # App structure
│   ├── Header/           # Header with sidebar
│   ├── Body/             # Main pages
│   └── Layout.tsx        # Main layout
├── ErrorHandling/        # Error handling
├── types/                # Shared TypeScript types
├── App.tsx               # Main routing component
├── NotFound.tsx          # 404 error page
└── main.tsx              # Entry point
```

---

## 🤝 Development Notes

This project was developed using **OpenCode** as a development assistant. The collaboration significantly optimized implementation time, helped understand Context API architectures more deeply, enabled immediate resolution of complex errors, and made learning concepts like `useContext`, custom hooks, and data flow in React applications much more satisfying. Despite the multiple errors that arose during development, each one was successfully corrected and the assistance provided was instrumental in consolidating the understanding of React fundamentals.
