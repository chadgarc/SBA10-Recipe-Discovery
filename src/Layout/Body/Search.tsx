import { useParams, useNavigate } from "react-router-dom";
import { useDataContext } from "../../contextsAndProviders/DataContext";
import { Loading } from "../../Components/Loading";
import { RecipeCard } from "../../Components/RecipesPresentation/RecipeCard";

export function Search() {
    const { query } = useParams<{query: string}>();
    const { recipes, loading, error } = useDataContext();
    const navigate = useNavigate();
    const displayQuery = query ? query.replace(/_/g, ' ') : '';

    return (
        <section className="text-center py-6">
            <button className="btn btn-sm btn-outline mb-4" onClick={() => navigate(-1)}>← Back</button>
            <h2 className="text-xl font-semibold mb-4">Search: {displayQuery}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-items-center">
                {loading && <Loading />}
                {error && <p className="text-center text-red-500">Error: {error.message}</p>}
                {!loading && !error && recipes && recipes.length === 0 && <p className="text-center text-gray-500 mx-auto">No matches</p>}
                {!loading && !error && recipes && recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} {...recipe} />
                ))}
            </div>
        </section>
    );
}
