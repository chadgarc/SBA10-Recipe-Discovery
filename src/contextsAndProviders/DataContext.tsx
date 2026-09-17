import { createContext, useCallback, useContext, useState } from "react";
import { useFetch } from "../CustomHooks/useFetch";
import type { DataContextType, Meal, queryType } from "../types";

const DataContext = createContext<DataContextType | null>(null);

export function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [fetchType, setFetchType] = useState<queryType>('search');
    const [favorites, setFavorites] = useState<Meal[]>([]);
    
    const { data: recipes, loading, error } = useFetch({ query: searchQuery, type: fetchType });
    const { data: categories } = useFetch({ query: '', type: 'categories' });
    
    const isLoading = loading;
    
    const getRecipesByLetter = (query: string) => {
        setSearchQuery(query);
        setFetchType('letter');
    };
    
    const getRecipesByCategory = (query: string) => {
        setSearchQuery(query);
        setFetchType('category');
    };
    
    const getRecipesByIngredient = (query: string) => {
        setSearchQuery(query);
        setFetchType('ingredient');
    };
    
    const getRecipesByRandom = (query: string) => {
        setSearchQuery(query);
        setFetchType('random');
    };
    
    const addFavorites = useCallback((recipe: Meal) => setFavorites((prev) => [...prev, recipe]), []);
    const removeFavorites = useCallback((idMeal: string) => setFavorites(prev => prev.filter(meal => meal.id !== idMeal)), []);
    
    const toggleFavorites = useCallback((recipe: Meal) => {
        favorites.find((meal) => meal.id === recipe.id)
            ? removeFavorites(recipe.id)
            : addFavorites(recipe);
    }, [favorites]);
    
    return (
        <DataContext.Provider value={{ getRecipesByLetter, getRecipesByCategory, getRecipesByIngredient, getRecipesByRandom, setSearchQuery, recipes, searchQuery, favorites, toggleFavorites, categories, loading, error, isLoading }}>
            {children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider')
    }
    return context
}
