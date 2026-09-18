import type { Ingredient } from "../../types";

export function IngredientCard(ingredient: Ingredient) {
    const { name, imageURL } = ingredient;
    return (
        <>
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
