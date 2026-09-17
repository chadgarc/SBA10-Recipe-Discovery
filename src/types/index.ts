
export type queryType = 'search' | 'category' | 'ingredient' | 'categories' | 'random';

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

export interface DataContextType {
    setSearchQuery: (searchQuery: string) => void;
    setSearchType: (searchType: queryType) => void;
    recipes: Meal[];
    searchQuery: string;
    searchType: queryType;
    favorites: Meal[];
    addFavorites: (recipe: Meal) => void;
    categories: string[];
    loading: boolean;
    error: any;
}