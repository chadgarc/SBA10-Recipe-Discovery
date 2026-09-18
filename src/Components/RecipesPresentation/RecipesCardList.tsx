import { RecipeCard } from "./RecipeCard";
import type { Meal } from "../../types";

export function RecipesCardList({recipes}: {recipes: Meal[]}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-4 justify-items-center">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </div>
    )
}