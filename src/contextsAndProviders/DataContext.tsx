import { createContext, useContext, useState } from "react";
import { useFetch } from "../CustomHooks/useFetch";
import type { DataContextType, queryType } from "../types";

const DataContext = createContext<DataContextType | null>(null);

export function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [fetchType, setFetchType] = useState<queryType>('search');
    const { data: recipes, loading, error } = useFetch({ query: searchQuery, type: fetchType });
    const { data: categories } = useFetch({ query: '', type: 'categories' });
    const {data: ingredients} = useFetch({query: '', type: 'ingredients'});

    const isLoading = loading;
    
    const getRecipesBySearch = (query: string) => {
        setFetchType('search');
        setSearchQuery(query);
    };
    
    const getRecipesByLetter = (query: string) => {
        setFetchType('letter');
        setSearchQuery(query);
    };
    
    const getRecipesByCategory = (query: string) => {
        setFetchType('category');
        setSearchQuery(query);
    };
    
    const getRecipesByIngredient = (query: string) => {
        setFetchType('ingredient');
        setSearchQuery(query);
    };
    
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

export function useDataContext() {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider')
    }
    return context
}
