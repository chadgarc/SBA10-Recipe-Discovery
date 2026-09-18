
export type queryType = 'search' | 'category' | 'ingredient' | 'categories' | 'random' | 'random10' | 'letter' | 'ingredients';

export interface FetchParams {
    query?: string;
    type: queryType;
}

export interface Meal {
    id: string;
    name: string;
    imageURL: string;
    category?: string;
    country?: string;
    ingredients?: string[];
    measurements?: string[];
    instructions?: string[];
    source?: string;
    videoURL?: string;
}

export interface Ingredient {
    id?: string;
    name: string;
    imageURL: string;
}

export interface DataContextType {
    ingredients: Ingredient[];
    getRecipesBySearch: (query: string) => void;
    getRecipesByLetter: (query: string) => void;
    getRecipesByCategory: (query: string) => void;
    getRecipesByIngredient: (query: string) => void;
    getRecipesByRandom: (query: string) => void;
    setSearchQuery: (searchQuery: string) => void;
    recipes: Meal[];
    searchQuery: string;
    favorites: Meal[];
    toggleFavorites: (recipe: Meal) => void;
    categories: string[];
    loading: boolean;
    error: any;
    isLoading: boolean;
}