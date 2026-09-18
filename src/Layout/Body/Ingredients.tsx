import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../contextsAndProviders/DataContext";
import { IngredientCardList } from "../../Components/RecipeDetails/IngredientCardList";
import { Loading } from "../../Components/Loading";

export function Ingredients() {
    const navigate = useNavigate();
    const {ingredients} = useDataContext();
    return (
        <section className="p-5">
            <button className="btn btn-sm btn-outline mb-4" onClick={() => navigate(-1)}>← Back</button>
            <h1 className="">Ingredients</h1>
            {ingredients && ingredients.length > 0 ? <IngredientCardList ingredients={ingredients}/> : <Loading />}
        </section>
    )
}
