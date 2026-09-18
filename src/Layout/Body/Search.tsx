import { useParams } from "react-router-dom";
import { useDataContext } from "../../contextsAndProviders/DataContext";

export function Search() {
    const { query } = useParams<{query: string}>();
    const { recipes, loading, error } = useDataContext();
    const displayQuery = query ? query.replace(/_/g, ' ') : '';

    return (
        <section className="text-center py-6">
            <h2 className="text-xl font-semibold mb-4">Search: {displayQuery}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {!loading && !error && recipes && recipes.map((recipe) => (
                    <div key={recipe.id} className="card bg-base-100 shadow-xl">
                        <figure><img src={recipe.imageURL} alt={recipe.name} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{recipe.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
