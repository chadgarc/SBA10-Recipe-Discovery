import { useState, useEffect } from "react";

/**
 * Custom hook that syncs a piece of state with localStorage,
 * persisting the value across browser sessions.
 *
 * @template T - The type of the value being stored
 * @param {string} key - The localStorage key to use for persistence
 * @param {T} initialValue - The initial value if nothing is stored in localStorage
 * @returns {[T, (value: T) => void]} A tuple containing the current value and a setter function
 *
 * @example
 * const [favorites, setFavorites] = useLocalStorage<Meal[]>('favorites', []);
 * setFavorites([...favorites, newRecipe]);
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);
    return [value, setValue] as const;
}
