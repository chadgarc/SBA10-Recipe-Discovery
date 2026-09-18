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

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useLocalStorage<Meal[]>('favorites', []);

    const addFavorite = useCallback((recipe: Meal) => {
        setFavorites((prev) => [...prev, recipe]);
    }, [setFavorites]);

    const removeFavorite = useCallback((id: string) => {
        setFavorites((prev) => prev.filter((meal) => meal.id !== id));
    }, [setFavorites]);

    const toggleFavorite = useCallback((recipe: Meal) => {
        setFavorites((prev) =>
            prev.find((m) => m.id === recipe.id)
                ? prev.filter((m) => m.id !== recipe.id)
                : [...prev, recipe]
        );
    }, [setFavorites]);

    const isFavorite = useCallback((id: string) => {
        return favorites.some((meal) => meal.id === id);
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
