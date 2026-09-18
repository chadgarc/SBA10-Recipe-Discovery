import type { Meal, Ingredient } from "../types";
import { FetchError } from "../ErrorHandling/ErrorHandler";

const BASE_URL = 'https://themealdb.com/api/json/v1/1/';

/**
 * Fetches recipes matching a search query from TheMealDB API.
 * @param {string} query - The search term
 * @returns {Promise<Meal[]>} Array of normalized meals
 */
export async function fetchBySearch(query: string) {
    try {
        const response = await fetch(BASE_URL + 'search.php?s=' + query.trim().toLowerCase().replaceAll(' ', '_'));
        const data = await response.json();
        if(!data.meals) return [];
        return data.meals.map((meal: any) => normalizeMeal(meal));
    } catch (error) {
        throw new FetchError("Failed to search data:" + error);
    }
}

/**
 * Fetches a single recipe by its ID from TheMealDB API.
 * @param {string} id - The recipe ID
 * @returns {Promise<Meal[]>} Array containing a single normalized meal
 */
export async function fetchRecipeById(id: string) {
    try {
        const response = await fetch(BASE_URL + 'lookup.php?i=' + id);
        const data = await response.json();
        if(!data.meals) return [];
        return [normalizeMeal(data.meals[0])];
    } catch (error) {
        throw new FetchError("Failed to lookup recipe:" + error);
    }
}

/**
 * Fetches recipes starting with a specific letter from TheMealDB API.
 * @param {string} letter - The starting letter
 * @returns {Promise<Meal[]>} Array of normalized meals
 */
export async function fetchRecipesStartingWithLetter(letter: string) {
    try {
        const response = await fetch(BASE_URL + 'search.php?f=' + letter.toLowerCase());
        const data = await response.json();
        if(!data.meals) return [];
        return data.meals.map((meal: any) => normalizeMeal(meal));
    } catch (error) {
        throw new FetchError(`Failed to fetch recipes starting with ${letter}: ${error}`);
    }
}

/**
 * Fetches recipes filtered by category from TheMealDB API.
 * @param {string} category - The category name
 * @returns {Promise<Meal[]>} Array of normalized meals
 */
export async function fetchByCategory(category: string) {
    try {
        const response = await fetch(BASE_URL + 'filter.php?c=' + category.toLowerCase());
        const data = await response.json();
        if(!data.meals) return [];
        return data.meals.map((meal: any) => normalizeMeal(meal));
    } catch (error) {
        throw new FetchError(`Failed to fetch category ${category}: ${error}`);
    }
}

/**
 * Fetches recipes filtered by ingredient from TheMealDB API.
 * @param {string} ingredient - The ingredient name
 * @returns {Promise<Meal[]>} Array of simplified meal objects
 */
export async function fetchByIngredient(ingredient: string) {
    try {
        const response = await fetch(BASE_URL + 'filter.php?i=' + ingredient.toLowerCase().replaceAll(' ', '_'));
        const data = await response.json();
        if(!data.meals) return [];
        return data.meals.map((meal: any) => {
            return {
                id: meal.idMeal,
                name: meal.strMeal,
                imageURL: meal.strMealThumb
            } as Meal;
        });
    } catch (error) {
        throw new FetchError(`Failed to fetch recipes by ingredient ${ingredient}: ${error}`);
    }
}

/**
 * Fetches the list of all categories from TheMealDB API.
 * @returns {Promise<string[]>} Array of category names
 */
export async function fetchCategories() {
    try {
        const response = await fetch(BASE_URL + 'list.php?c=list');
        const data = await response.json();
        if(!data.meals) return [];
        console.log(data.meals.map((category: any) => `${category.strCategory}`));
        return data.meals.map((category: any) => `${category.strCategory}`);
    } catch (error) {
        throw new FetchError("Failed to fetch categories:" + error);
    }
}

/**
 * Fetches the list of all ingredients from TheMealDB API.
 * @returns {Promise<Ingredient[]>} Array of ingredient objects
 */
export async function fetchIngredientsList() {
    try {
        const response = await fetch(BASE_URL + 'list.php?i=list');
        const data = await response.json();
        if(!data.meals) return [];
        return data.meals.map((ing: any) => {
            const { idIngredient, strIngredient, strThumb } = ing;
            return { id: idIngredient, name: strIngredient, imageURL: strThumb } as Ingredient
        });
    } catch (error) {
        throw new FetchError("Failed to fetch ingredients:" + error);
    }
}

/**
 * Fetches multiple random recipes from TheMealDB API.
 * @param {number} [count=10] - Number of random recipes to fetch
 * @returns {Promise<Meal[]>} Array of normalized random meals
 */
export async function fetchRandomRecipes(count = 10) {
    try {
        const recipes = await Promise.all(
            Array.from({ length: count }, () =>
                fetch(BASE_URL + 'random.php').then(r => r.json()).then(d => {
                    if(!d.meals) return normalizeMeal({idMeal: '', strMeal: '', strMealThumb: ''} as any);
                    return normalizeMeal(d.meals[0]);
                })
            )
        );
        return recipes;
    } catch (error) {
        throw new FetchError("Failed to fetch random recipes: " + error);
    }
}

/**
 * Fetches a single random recipe from TheMealDB API.
 * @returns {Promise<Meal[]>} Array containing a single random normalized meal
 */
export async function fetchRandomRecipe(){
    try {
        const response = await fetch(BASE_URL + 'random.php');
        const data = await response.json();
        if(!data.meals) return [];
        return [normalizeMeal(data.meals[0])];
    } catch (error) {
        throw new FetchError("Failed to fetch random recipe: " + error);
    }
}

/**
 * Normalizes a raw meal object from TheMealDB API into a consistent Meal type.
 * @param {any} meal - The raw meal object from the API
 * @returns {Meal} The normalized meal object
 */
function normalizeMeal(meal: any): Meal {
    return {
        id: meal.idMeal,
        name: meal.strMeal,
        imageURL: meal.strMealThumb,
        category: meal.strCategory || 'Miscellaneous',
        country: meal.strCountry || 'Unknown',
        instructions: meal.strInstructions
            ?.replaceAll('\r', '\n')
            ?.split('\n')
            .filter((instruction: string) => instruction.trim() !== '') || ['No instructions available'],
        ingredients: [
            meal.strIngredient1 || '', meal.strIngredient2 || '', meal.strIngredient3 || '',
            meal.strIngredient4 || '', meal.strIngredient5 || '', meal.strIngredient6 || '',
            meal.strIngredient7 || '', meal.strIngredient8 || '', meal.strIngredient9 || '',
            meal.strIngredient10 || '', meal.strIngredient11 || '', meal.strIngredient12 || '',
            meal.strIngredient13 || '', meal.strIngredient14 || '', meal.strIngredient15 || '',
            meal.strIngredient16 || '', meal.strIngredient17 || '', meal.strIngredient18 || '',
            meal.strIngredient19 || '', meal.strIngredient20 || '',
        ].filter((ingredient: string) => ingredient.trim() !== '') || ['No ingredients available'],
        measurements: [
            meal.strMeasure1 || '', meal.strMeasure2 || '', meal.strMeasure3 || '',
            meal.strMeasure4 || '', meal.strMeasure5 || '', meal.strMeasure6 || '',
            meal.strMeasure7 || '', meal.strMeasure8 || '', meal.strMeasure9 || '',
            meal.strMeasure10 || '', meal.strMeasure11 || '', meal.strMeasure12 || '',
            meal.strMeasure13 || '', meal.strMeasure14 || '', meal.strMeasure15 || '',
            meal.strMeasure16 || '', meal.strMeasure17 || '', meal.strMeasure18 || '',
            meal.strMeasure19 || '', meal.strMeasure20 || '',
        ].filter((measurement: string) => measurement.trim() !== '') || ['No measurements available'],
        source: meal.strSource || 'No Source Available',
        videoURL: meal.strYoutube || undefined,
    };
}
