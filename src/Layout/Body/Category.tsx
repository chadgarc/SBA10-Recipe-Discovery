import { useParams } from "react-router-dom";
import { useFetch } from "../../CustomHooks/useFetch";
import { RecipeCard } from "../../Components/RecipesPresentation/RecipeCard";
import { Loading } from "../../Components/Loading";

export function Category() {
    const { categoryName } = useParams<{categoryName: string}>();
    const { data: recipes, loading, error } = useFetch({ query: categoryName || '', type: 'category' });

    return (
        <section className="py-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Category: {categoryName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {loading && <div className="w-full"><Loading /></div>}
                {error && <p className="text-center text-red-500">Error: {(error as Error).message}</p>}
                {!loading && !error && recipes && recipes.length === 0 && <p className="text-center text-gray-500">No matches</p>}
                {!loading && !error && recipes && recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} {...recipe} />
                ))}
            </div>
        </section>
    );
}
