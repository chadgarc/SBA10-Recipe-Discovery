import type { Meal } from "../types";


const BASE_URL = 'https://themealdb.com/api/json/v1/1/'
const INGREDIENT_IMAGE_URL = 'https://themealdb.com/images/ingredients/'

export async function fetchBySearch(query: string) {
    try {
        const response = await fetch(BASE_URL + 'search.php?s=' + query.trim().toLowerCase().replaceAll(' ', '_'));
        const data = await response.json();
        return data.meals.map((meal: any) => normalizeMeal(meal));
    } catch (error) {
        throw new Error("Failed to search data:" + error);
    }
}

export async function fetchRecipeById(id: string) {
    try {
        const response = await fetch(BASE_URL + 'lookup.php?i=' + id);
        const data = await response.json();
        return normalizeMeal(data.meals[0]);
    } catch (error) {
        throw new Error("Failed to lookup recipe:" + error);
    }
}

export async function fetchRecipesStartingWithLetter(letter: string) {
    try {
        const response = await fetch(BASE_URL + 'search.php?f=' + letter.toLowerCase());
        const data = await response.json();
        return data.meals.map((meal: any) => normalizeMeal(meal));
    } catch (error) {
        throw new Error(`Failed to fetch recipes starting with ${letter}: ${error}`);
    }
}

export async function fetchByCategory(category: string) {
    try {
        const response = await fetch(BASE_URL + 'filter.php?c=' + category.toLowerCase());
        const data = await response.json();
        return data.meals.map((meal: any) => normalizeMeal(meal));
    } catch (error) {
        throw new Error(`Failed to fetch category ${category}: ${error}`);
    }
}

export async function fetchByIngredient(ingredient: string) {
    try {
        const response = await fetch(BASE_URL + 'filter.php?i=' + ingredient.toLowerCase().replaceAll(' ', '_'));
        const data = await response.json();
        return data.meals.map((meal: any) => {
            return {
                id: meal.idMeal,
                name: meal.strMeal,
                imageURL: meal.strMealThumb
            } as Meal;
        });
    } catch (error) {
        throw new Error(`Failed to fetch recipes by ingredient ${ingredient}: ${error}`);
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch(BASE_URL + 'list.php?c=list');
        const data = await response.json();
        console.log(data.meals.map((category: any) => `${category.strCategory}`));
        return data.meals.map((category: any) => `${category.strCategory}`);
    } catch (error) {
        throw new Error("Failed to fetch categories:" + error);
    }
}

export async function fetchRandomRecipe(){
    try {
        const response = await fetch(BASE_URL + 'random.php');
        const data = await response.json();
        return [normalizeMeal(data.meals[0])];
    } catch (error) {
        throw new Error("Failed to fetch random recipe: " + error);
    }
}

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
            .filter((instruction) => instruction.trim() !== '') || ['No instructions available'],
        ingredients: [
            meal.strIngredient1 || '',
            meal.strIngredient2 || '',
            meal.strIngredient3 || '',
            meal.strIngredient4 || '',
            meal.strIngredient5 || '',
            meal.strIngredient6 || '',
            meal.strIngredient7 || '',
            meal.strIngredient8 || '',
            meal.strIngredient9 || '',
            meal.strIngredient10 || '',
            meal.strIngredient11 || '',
            meal.strIngredient12 || '',
            meal.strIngredient13 || '',
            meal.strIngredient14 || '',
            meal.strIngredient15 || '',
            meal.strIngredient16 || '',
            meal.strIngredient17 || '',
            meal.strIngredient18 || '',
            meal.strIngredient19 || '',
            meal.strIngredient20 || '',
        ].filter((ingredient) => ingredient.trim() !== '') || ['No ingredients available'],
        measurements: [
            meal.strMeasure1 || '',
            meal.strMeasure2 || '',
            meal.strMeasure3 || '',
            meal.strMeasure4 || '',
            meal.strMeasure5 || '',
            meal.strMeasure6 || '',
            meal.strMeasure7 || '',
            meal.strMeasure8 || '',
            meal.strMeasure9 || '',
            meal.strMeasure10 || '',
            meal.strMeasure11 || '',
            meal.strMeasure12 || '',
            meal.strMeasure13 || '',
            meal.strMeasure14 || '',
            meal.strMeasure15 || '',
            meal.strMeasure16 || '',
            meal.strMeasure17 || '',
            meal.strMeasure18 || '',
            meal.strMeasure19 || '',
            meal.strMeasure20 || '',
        ].filter((measurement) => measurement.trim() !== '') || ['No measurements available'],
        source: meal.strSource || 'No Source Available',
        videoURL: meal.strYoutube || 'No video Available',
    };
}