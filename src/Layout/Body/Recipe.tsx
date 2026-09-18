import { useParams } from "react-router-dom";
import { useFetch } from "../../CustomHooks/useFetch";
import { useFavorites } from "../../contextsAndProviders/FavoritesContext";

export function Recipe() {
    const { recipeId } = useParams<{recipeId: string}>();
    const { data: recipe, loading, error } = useFetch({ query: recipeId || '', type: 'id' });
    const { isFavorite, toggleFavorite } = useFavorites();

    const recipeData = recipe?.[0] || null;

    if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg" /></div>;
    if (error) return <p className="text-center py-20 text-red-500">Error: {(error as Error).message}</p>;
    if (!recipeData) return <p className="text-center py-20">No recipe found</p>;

    return (
        <section className="py-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">{recipeData.name}</h2>
            <div className="card bg-base-100 shadow-xl">
                <div className="hover-3d">
                    <figure className="rounded-2xl w-60 md:w-100 lg:w-150 aspect-[4/3]">
                        <img src={recipeData.imageURL} alt={recipeData.name} />
                    </figure>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{recipeData.name}</h2>
                    {recipeData.country && <p>Country: {recipeData.country}</p>}
                    {recipeData.videoURL ? (
                        <video controls className="w-full mt-2">
                            <source src={recipeData.videoURL} type="video/mp4" />
                        </video>
                    ) : null}
                    <h3 className="font-semibold mt-4">Instructions</h3>
                    <ul className="list-disc list-inside">
                        {recipeData.instructions?.map((inst, i) => (
                            <li key={i}>{inst}</li>
                        ))}
                    </ul>
                    <h3 className="font-semibold mt-4">Ingredients</h3>
                    <ul className="list-disc list-inside">
                        {recipeData.ingredients?.map((ing, i) => (
                            <li key={i}>{ing} — {recipeData.measurements?.[i] || ''}</li>
                        ))}
                    </ul>
                    <div className="card-actions justify-end mt-4">
                        <button
                            className={`btn ${isFavorite(recipeData.id) ? 'btn-error' : 'btn-outline'}`}
                            onClick={() => toggleFavorite(recipeData)}
                        >
                            {isFavorite(recipeData.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
