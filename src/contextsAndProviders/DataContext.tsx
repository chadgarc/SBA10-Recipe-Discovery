import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../CustomHooks/useFetch";
import type { DataContextType, queryType, Meal } from "../types";

const DataContext = createContext<DataContextType | null>(null);

export function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<queryType>('search');
    const { data: recipes, loading, error } = useFetch({ query: searchQuery, type: searchType });
    const [favorites, setFavorites] = useState<Meal[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
    }, []); 

    const addFavorites = (recipe: Meal) => setFavorites((prev) => [...prev, recipe]);

    return (
        <DataContext.Provider value={{setSearchQuery, setSearchType, recipes, searchQuery, searchType,
        favorites, addFavorites, categories, loading, error}}>
            {children}
        </DataContext.Provider>
    )
}

export function useDataContext() {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider')
    }
    return context
}
