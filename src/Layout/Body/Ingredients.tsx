import { useDataContext } from "../../contextsAndProviders/DataContext";
import { IngredientCardList } from "../../Components/RecipeDetails/IngredientCardList";

export function Ingredients() {
    const {ingredients} = useDataContext();
    return (
        <section className="p-5">
            <h1 className="">Ingredients</h1>
            <IngredientCardList ingredients={ingredients}/>
        </section>
    )
}