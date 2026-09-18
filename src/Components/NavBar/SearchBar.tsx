import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../contextsAndProviders/DataContext";

export function SearchBar(){
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { setSearchQuery } = useDataContext();

    const handleSearch = () => {
        if(!query.trim()) return;
        const formattedQuery = query.trim().toLowerCase().replace(/\s/g, '_');
        setSearchQuery(query.trim());
        navigate('/search/' + formattedQuery);
    };

    return(
        <>
            <label className="input join">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    className="grow"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-square join-item" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 2a8 8 0 105.293 14.707l4 4a1 1 0 001.414-1.414l-4-4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
                    </svg>
                </button>
            </label>
        </>
    );
}
