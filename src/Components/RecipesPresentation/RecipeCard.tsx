import type { Meal } from "../../types";
import { Link } from "react-router-dom";

export function RecipeCard(recipe: Meal){
    const {id, name, imageURL} = recipe;
    return (
        <Link to={`/recipe/${id}`} className="card bg-base-100 shadow-xl w-65">
            <div className="hover-3d h-full">
            <figure className="max-w-100 rounded-2xl">
                <div>
                    <div className="card bg-base-100 shadow-sm">
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
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
        </Link>
    )
}
