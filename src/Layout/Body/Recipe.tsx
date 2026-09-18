import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../CustomHooks/useFetch";
import { useFavorites } from "../../contextsAndProviders/FavoritesContext";

export function Recipe() {
    const { recipeId } = useParams<{recipeId: string}>();
    const navigate = useNavigate();
    const { data: recipe, loading, error } = useFetch({ query: recipeId || '', type: 'id' });
    const { isFavorite, toggleFavorite } = useFavorites();

    const recipeData = recipe?.[0] || null;

    if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg" /></div>;
    if (error) return <p className="text-center py-20 text-red-500">Error: {(error as Error).message}</p>;
    if (!recipeData) return <p className="text-center py-20">No recipe found</p>;

    const getEmbedUrl = (url: string) => {
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };

    return (
        <section className="py-6 max-w-4xl mx-auto">
            <button className="btn btn-sm btn-outline mb-4" onClick={() => navigate(-1)}>← Back</button>
            <h2 className="mx-auto">{recipeData.name}</h2>
            <figure className="rounded-2xl w-60 md:w-100 lg:w-150 h-auto mx-auto my-10">
                <img src={recipeData.imageURL} alt={recipeData.name} />
            </figure>
            {recipeData.country && <p>Country: {recipeData.country}</p>}
            {recipeData.videoURL ? (
                <div className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden" style={{paddingTop: "56.25%"}}>
                    <iframe className="embed-responsive-item absolute bottom-0 left-0 right-0 top-0 h-full w-full" src={getEmbedUrl(recipeData.videoURL)} allowFullScreen />
                </div>
            ) : null}
            <h3 className="font-semibold mt-4">Instructions</h3>
            <ul className="list-disc list-inside">
                {recipeData.instructions?.map((inst: string, i: number) => (
                    <li key={i}>{inst}</li>
                ))}
            </ul>
            <h3 className="font-semibold mt-4">Ingredients</h3>
            <ul className="list-disc list-inside">
                {recipeData.ingredients?.map((ing: string, i: number) => (
                    <li key={i}>{ing} — {recipeData.measurements?.[i] || ''}</li>
                ))}
            </ul>
            <div className="justify-end mt-4">
                <button
                    className={`btn ${isFavorite(recipeData.id) ? 'btn-error' : 'btn-outline'}`}
                    onClick={() => toggleFavorite(recipeData)}
                >
                    {isFavorite(recipeData.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </section>
    );
}
