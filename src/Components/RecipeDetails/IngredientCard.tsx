import type { Ingredient } from "../../types";

export function IngredientCard(ingredient: Ingredient) {
    const { name, imageURL } = ingredient;
    return (
        <>
            <div className="hover-3d">
            <figure className="max-w-100 rounded-2xl">
                <div>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                            src={`${imageURL}/small`}
                            alt={`${name} picture`} />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{name}</h3>
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
        </>
    )
}
