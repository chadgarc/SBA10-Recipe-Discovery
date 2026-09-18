import { useEffect, useState } from "react";
import { useDataContext } from "../contextsAndProviders/DataContext";

/**
 * An array of uppercase letters A-Z used for pagination.
 * Each letter acts as a filter button to search recipes starting with that letter.
 */
const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

/**
 * A component that renders letter buttons A-Z as a pagination bar.
 * Clicking a letter triggers a fetch for recipes starting with that letter.
 * The active letter is highlighted visually.
 *
 * @example
 * <LetterPagination />
 */
export function LetterPagination() {
    const { getRecipesByLetter } = useDataContext();
    const [activeLetter, setActiveLetter] = useState('');

    useEffect(() => {
        setActiveLetter('A');
        getRecipesByLetter('a'.toLowerCase());
    }, []);

    const handleClick = (letter: string) => {
        setActiveLetter(letter);
        getRecipesByLetter(letter.toLowerCase());
    };

    return (
        <div className="join flex flex-wrap justify-center">
            {LETTERS.map((letter) => (
                <button
                    key={letter}
                    className={`join-item btn btn-square btn-sm ${activeLetter === letter ? 'btn-active' : ''}`}
                    onClick={() => handleClick(letter)}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}
