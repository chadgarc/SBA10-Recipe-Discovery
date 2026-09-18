import { Link } from "react-router-dom";
import { useFavorites } from "../contextsAndProviders/FavoritesContext";
import type { Meal } from "../types";

interface RecipeCardProps {
    recipe: Meal;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={recipe.imageURL} alt={recipe.name} /></figure>
            <div className="card-body">
                <h1 className="card-title">{recipe.name}</h1>
                {recipe.country && <p>{recipe.country}</p>}
                {recipe.videoURL ? (
                    <video controls className="w-full mt-2">
                        <source src={recipe.videoURL} type="video/mp4" />
                    </video>
                ) : null}
                <div className="card-actions justify-end">
                    <button
                        className={`btn btn-sm ${isFavorite(recipe.id) ? 'btn-error' : 'btn-outline'}`}
                        onClick={() => toggleFavorite(recipe)}
                    >
                        {isFavorite(recipe.id) ? 'Remove Favorite' : 'Add Favorite'}
                    </button>
                    <Link to={`/recipe/${recipe.id}`} className="btn btn-sm btn-primary">
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
