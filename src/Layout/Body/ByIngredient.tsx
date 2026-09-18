import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../CustomHooks/useFetch";
import { RecipeCard } from "../../Components/RecipesPresentation/RecipeCard";
import { Loading } from "../../Components/Loading";

export function ByIngredient() {
    const { ingredient } = useParams<{ingredient: string}>();
    const navigate = useNavigate();
    const decodedIngredient = ingredient ? ingredient.replace(/_/g, ' ') : '';
    const { data: recipes, loading, error } = useFetch({ query: decodedIngredient, type: 'ingredient' });

    return (
        <section className="py-6">
            <button className="btn btn-sm btn-outline mb-4" onClick={() => navigate(-1)}>← Back</button>
            <h2 className="text-xl font-semibold mb-4 text-center">Recipes with {decodedIngredient}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center">
                {loading && <div className="w-full mx-auto"><Loading /></div>}
                {error && <p className="text-center text-red-500">Error: {(error as Error).message}</p>}
                {!loading && !error && recipes && recipes.length === 0 && <p className="text-center text-gray-500">No matches</p>}
                {!loading && !error && recipes && recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} {...recipe} />
                ))}
            </div>
        </section>
    );
}
