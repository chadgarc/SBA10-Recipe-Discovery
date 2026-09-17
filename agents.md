# Agent Instructions — Recipe Discovery App

## 📌 Project Overview

This project is a Recipe Discovery SPA built with React.  
It uses TheMealDB API to browse categories, view recipes, search meals, and manage a global list of favorites.

Your job as the agent is to review, improve, and help implement the project according to the requirements below.

---

## 🟦 Core Requirements

### 1. State Management & Data Fetching

The application must:

- Use `useState` + `useEffect` for API calls.
- Handle loading states (spinner or message).
- Handle error states (error message).
- Fetch data from TheMealDB API endpoints.

Endpoints commonly used:

- Categories: `https://www.themealdb.com/api/json/v1/1/categories.php`
- Filter by category: `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`
- Recipe details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`
- Search: `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`

---

## 🟧 Custom Hooks (Required)

### 1. useFetch

A reusable hook that must:

- Accept a URL
- Return `{ data, loading, error }`
- Handle fetch lifecycle internally

### 2. useLocalStorage

A reusable hook that must:

- Sync a piece of state with localStorage
- Return `[value, setValue]`
- Persist favorites across sessions

---

## 🟩 Global State — FavoritesContext

The app must include a global FavoritesContext that provides:

- `favorites`: array of recipe IDs
- `addFavorite(id)`
- `removeFavorite(id)`
- `isFavorite(id)`
- Uses `useLocalStorage` internally

This context must wrap the entire app.

---

## 🟪 Routing Requirements (React Router)

The app must include the following pages:

### `/` — Home Page

- Fetch and display all recipe categories
- Each category links to `/category/[categoryName]`

### `/category/:categoryName` — Category Page

- Fetch recipes for the selected category
- Each recipe links to `/recipe/[recipeId]`

### `/recipe/:recipeId` — Recipe Detail Page

- Fetch full recipe details
- Show ingredients, instructions, image
- Include “Add to Favorites” / “Remove from Favorites” button
- Button state must come from FavoritesContext

### `/favorites` — Favorites Page

- Show all favorited recipes
- If empty, show a friendly message

### `/search?query=...` — Search Results Page

- Triggered by a search bar (likely in Navbar)
- Fetch and display search results

---

## 🟫 Components & UI Requirements

Reusable components recommended:

- `Navbar`
- `RecipeCard`
- `Spinner`
- `ErrorMessage`

UI must be:

- Responsive
- Clean
- Consistent
- Easy to navigate

---

## ⭐ Agent Tasks (What you should help with)

- Review custom hooks (`useFetch`, `useLocalStorage`)
- Review FavoritesContext logic
- Verify persistence works correctly
- Check routing structure and dynamic routes
- Ensure pages fetch correct data
- Ensure loading and error states are handled
- Help debug broken routes or fetches
- Suggest improvements to component structure
- Help write missing components
- Ensure search functionality works
- Ensure favorites page displays correct recipes
- Optimize re-renders when needed

---

## 🧪 Checklist for Progress Review

- [ ] useFetch implemented and reusable
- [ ] useLocalStorage implemented and reusable
- [ ] FavoritesContext implemented
- [ ] Favorites persist across reloads
- [ ] Home page shows categories
- [ ] Category page shows recipes
- [ ] Recipe detail page fetches full data
- [ ] Add/Remove favorites works
- [ ] Favorites page displays correct items
- [ ] Search bar navigates to /search
- [ ] Search results page works
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Routing structure correct
- [ ] Components reusable and organized
- [ ] UI responsive and clean

---

## 🎓 Grading Criteria (Rubric Summary)

**State & Data Fetching (20 pts)**

- Correct API usage
- Loading/error states handled

**Custom Hooks (20 pts)**

- useFetch + useLocalStorage correct and reusable

**Context API (20 pts)**

- FavoritesContext fully functional and persistent

**Routing (20 pts)**

- All routes implemented
- Dynamic routes work correctly

**Code Quality & UI (20 pts)**

- Clean structure
- Reusable components
- Responsive UI

Total: 100 pts

---

## 📝 Notes for the Agent

- Follow the project requirements strictly.
- Suggest improvements but keep the architecture intact.
- When editing files, apply minimal diffs.
- When creating new files, follow the recommended structure.
- Always check for TypeScript correctness (if TS is used).
- Ensure fetches and routing work together smoothly.
