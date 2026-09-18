import { Link } from "react-router-dom";
import { useDataContext } from "../../contextsAndProviders/DataContext";
import { IngredientCard } from "../../Components/RecipeDetails/IngredientCard";
import { Loading } from "../../Components/Loading";

export function Ingredients() {
    const {ingredients} = useDataContext();
    return (
        <section className="p-5">
            <button className="btn btn-sm btn-outline mb-4" onClick={() => window.history.back()}>← Back</button>
            <h1 className="">Ingredients</h1>
            {ingredients && ingredients.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-4 justify-items-center">
                    {ingredients.map((ingredient) => (
                        <Link key={ingredient.id} to={`/ingredients/${ingredient.name}`}>
                            <IngredientCard {...ingredient} />
                        </Link>
                    ))}
                </div>
            ) : <Loading />}
        </section>
    )
}
