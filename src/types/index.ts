
export interface Meal {
    id: string;
    name: string;
    imageURL: string;
    category?: string;
    country?: string;
    ingredients?: string[];
    measurements?: string[];
    instructions?: string;
    source?: string;
    videoURL?: string;
}