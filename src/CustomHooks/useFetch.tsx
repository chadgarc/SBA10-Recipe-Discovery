import { useState, useEffect } from "react";
import * as FetchData from "./FetchData";
import type { FetchParams } from "../types";

export function useFetch({query, type = "search"}:FetchParams){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            if(!query) return;
            setLoading(true);
            try{
            switch (type) {
                case "search":
                    setData(await FetchData.fetchBySearch(query));
                    break;
                case "category":
                    setData(await FetchData.fetchByCategory(query));
                    break;
                case "ingredient":
                    setData(await FetchData.fetchByIngredient(query));
                    break;
                case "categories":
                    setData(await FetchData.fetchCategories());
                    break;
                case "random":
                    setData(await FetchData.fetchRandomRecipe());
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