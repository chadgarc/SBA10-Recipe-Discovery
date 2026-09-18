import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
import type { Meal } from "../types";

interface FavoritesContextType {
    favorites: Meal[];
    addFavorite: (recipe: Meal) => void;
    removeFavorite: (id: string) => void;
    toggleFavorite: (recipe: Meal) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

/**
 * Provider component that manages the global favorites state using localStorage.
 * Wraps the entire app to make favorites available via useFavorites() hook.
 *
 * @param {{ children: React.ReactNode }} props - The children components
 * @example
 * <FavoritesProvider>
 *     <App />
 * </FavoritesProvider>
 */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useLocalStorage<Meal[]>('favorites', []);

    /** Adds a recipe to the favorites list. */
    const addFavorite = useCallback((recipe: Meal) => {
        setFavorites((prev) => [...prev, recipe]);
    }, [setFavorites]);

    /** Removes a recipe from favorites by its ID. */
    const removeFavorite = useCallback((id: string) => {
        setFavorites((prev) => prev.filter((meal) => meal.id !== id));
    }, [setFavorites]);

    /** Toggles a recipe in/out of favorites. If already a favorite, removes it; otherwise adds it. */
    const toggleFavorite = useCallback((recipe: Meal) => {
        setFavorites((prev) =>
            prev.find((m) => m.id === recipe.id)
                ? prev.filter((m) => m.id !== recipe.id)
                : [...prev, recipe]
        );
    }, [setFavorites]);

    /** Checks if a recipe (by ID) is currently in the favorites list. */
    const isFavorite = useCallback((id: string) => {
        return favorites.some((meal) => meal.id === id);
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

/**
 * Custom hook to access the favorites context.
 * Must be called within a FavoritesProvider.
 * @returns {FavoritesContextType} The favorites context value
 * @throws {Error} If used outside a FavoritesProvider
 */
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
