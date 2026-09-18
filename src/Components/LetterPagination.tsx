import { useEffect, useState } from "react";
import { useDataContext } from "../contextsAndProviders/DataContext";

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

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
