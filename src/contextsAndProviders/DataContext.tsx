import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../CustomHooks/FetchData";

const DataContext = createContext(null);

export function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [recipes, setRecipes] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState(null);
    const [categories, setCategories] = useState(null);
    const [areas, setAreas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    }, []); 

    const addFavorites = (recipe: any) => setFavorites([...favorites, recipe]);

    return (
        <DataContext.Provider value={{setRecipes, recipes, setSearchQuery, searchQuery,
        favorites, addFavorites, categories, areas, setLoading, loading, error, setError}}>
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
