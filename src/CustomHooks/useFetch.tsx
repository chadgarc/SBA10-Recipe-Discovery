import { useState, useEffect } from "react";
import * as FetchData from "./FetchData";
import type { FetchParams } from "../types";

export function useFetch({query, type = "search"}:FetchParams){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            if((!query || query === '') && type !== 'ingredients' && type !== 'categories'  && type !== 'random' && type !== 'random10') return;
            setLoading(true);
            setError(null);
            try{
            switch (type) {
                case "search":
                    setData(await FetchData.fetchBySearch(query));
                    break;
                case "letter":
                    setData(await FetchData.fetchRecipesStartingWithLetter(query));
                    break;
                case "category":
                    setData(await FetchData.fetchByCategory(query));
                    break;
                case "ingredient":
                    setData(await FetchData.fetchByIngredient(query));
                    break;
                case "ingredients":
                    setData(await FetchData.fetchIngredientsList());
                    break;
                case "categories":
                    setData(await FetchData.fetchCategories());
                    break;
                case "random":
                    setData(await FetchData.fetchRandomRecipe());
                    break;
                case "random10":
                    setData(await FetchData.fetchRandomRecipes(10));
                    break;
                case "id":
                    setData(await FetchData.fetchRecipeById(query || ''));
                    break;
                default:
                    break;
            }}catch(e){
                setError(e);
            }finally{
                setLoading(false);
            }
        }

        fetchData();
    },[query, type]);
    
    return { data, loading, error}
}