import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../contextsAndProviders/FavoritesContext";
import { RecipeCard } from "../../Components/RecipesPresentation/RecipeCard";

export function Favorites() {
    const navigate = useNavigate();
    const { favorites } = useFavorites();

    return (
        <section className="py-6">
            <button className="btn btn-sm btn-outline mb-4" onClick={() => navigate(-1)}>← Back</button>
            <h2 className="text-xl font-semibold mb-4 text-center">My Favorites</h2>
            {favorites.length === 0 ? (
                <p className="text-center py-10 text-gray-500">No favorites yet. Start adding recipes!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {favorites.map((favRecipe) => (
                        <RecipeCard key={favRecipe.id} {...favRecipe} />
                    ))}
                </div>
            )}
        </section>
    );
}
