import type { Meal } from "../../types";
import { Link } from "react-router-dom";

/**
 * A reusable card component that displays a meal's image and name.
 * Clicking the card navigates to the recipe detail page.
 *
 * @param {Meal} recipe - The meal object to display
 * @returns {JSX.Element} A clickable card component
 *
 * @example
 * <RecipeCard recipe={meal} />
 */
export function RecipeCard(recipe: Meal){
    const {id, name, imageURL} = recipe;
    return (
        <Link to={`/recipe/${id}`} className="card bg-base-100 shadow-xl w-65">
            <div className="hover-3d h-full">
            <figure className="max-w-100 rounded-2xl h-full">
                <div className="h-full w-full">
                    <div className="card bg-base-100 shadow-sm h-full">
                        <figure>
                            <img className="aspect-ratio-4/3"
                            src={`${imageURL}/medium`}
                            alt={`${name} picture`} />
                        </figure>
                        <div className="card-body">
                            <h5 className="card-title text-wrap">{name}</h5>
                        </div>
                    </div>
                </div>
            </figure>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </Link>
    )
}
