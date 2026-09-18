import { IngredientCard } from "./IngredientCard";
import type { Ingredient } from "../../types";

export function IngredientCardList({ingredients}: {ingredients: Ingredient[]}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full mx-auto">
            {ingredients.map((ingredient) => (
                <IngredientCard key={ingredient.id} {...ingredient} />
            ))}
        </div>
    )
}