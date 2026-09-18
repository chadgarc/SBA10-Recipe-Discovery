import { createContext, useContext, useState } from "react";
import { useFetch } from "../CustomHooks/useFetch";
import type { DataContextType, queryType } from "../types";

const DataContext = createContext<DataContextType | null>(null);

/**
 * Provider component that manages the global application state for recipes,
 * categories, ingredients, and search parameters.
 * Uses useFetch hook internally to handle all API calls.
 *
 * @param {{ children: React.ReactNode }} props - The children components
 * @example
 * <DataContextProvider>
 *     <App />
 * </DataContextProvider>
 */
export function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [fetchType, setFetchType] = useState<queryType>('search');
    const { data: recipes, loading, error } = useFetch({ query: searchQuery, type: fetchType });
    const { data: categories } = useFetch({ query: '', type: 'categories' });
    const {data: ingredients} = useFetch({query: '', type: 'ingredients'});

    const isLoading = loading;

    /** Sets the search query and fetch type to 'search'. */
    const getRecipesBySearch = (query: string) => {
        setFetchType('search');
        setSearchQuery(query);
    };

    /** Sets the search query and fetch type to 'letter'. */
    const getRecipesByLetter = (query: string) => {
        setFetchType('letter');
        setSearchQuery(query);
    };

    /** Sets the search query and fetch type to 'category'. */
    const getRecipesByCategory = (query: string) => {
        setFetchType('category');
        setSearchQuery(query);
    };

    /** Sets the search query and fetch type to 'ingredient'. */
    const getRecipesByIngredient = (query: string) => {
        setFetchType('ingredient');
        setSearchQuery(query);
    };

    /** Sets the search query and fetch type to 'random'. */
    const getRecipesByRandom = (query: string) => {
        setFetchType('random');
        setSearchQuery(query);
    };

    return (
        <DataContext.Provider value={{ ingredients, getRecipesBySearch, getRecipesByLetter, getRecipesByCategory, getRecipesByIngredient, getRecipesByRandom, setSearchQuery, recipes, searchQuery, categories, loading, error, isLoading }}>
            {children}
        </DataContext.Provider>
    );
}

/**
 * Custom hook to access the data context.
 * Must be called within a DataContextProvider.
 * @returns {DataContextType} The data context value
 * @throws {Error} If used outside a DataContextProvider
 */
export function useDataContext() {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider')
    }
    return context
}
