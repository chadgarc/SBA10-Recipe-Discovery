import { RecipeCard } from "./RecipeCard";
import type { Meal } from "../../types";

export function RecipesCardList({recipes}: {recipes: Meal[]}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full mx-auto">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </div>
    )
}