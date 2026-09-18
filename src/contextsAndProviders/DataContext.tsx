import { createContext, useCallback, useContext, useState } from "react";
import { useFetch } from "../CustomHooks/useFetch";
import type { DataContextType, Meal, queryType } from "../types";

const DataContext = createContext<DataContextType | null>(null);

export function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [fetchType, setFetchType] = useState<queryType>('search');
    
    const { data: recipes, loading, error } = useFetch({ query: searchQuery, type: fetchType });
    const { data: categories } = useFetch({ query: '', type: 'categories' });
    const {data: ingredients} = useFetch({query: '', type: 'ingredients'});

    const isLoading = loading;
    
    const getRecipesBySearch = (query: string) => {
        setSearchQuery(query);
        setFetchType('search');
    };
    
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
    
    return (
        <DataContext.Provider value={{ ingredients, getRecipesBySearch, getRecipesByLetter, getRecipesByCategory, getRecipesByIngredient, getRecipesByRandom, setSearchQuery, recipes, searchQuery, categories, loading, error, isLoading }}>
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
