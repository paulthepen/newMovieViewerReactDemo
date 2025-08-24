import {useEffect, useState} from "react";
import {GenreContext} from "../contexts/contexts.js";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);

    async function getGenres () {
        const genreData = {};
        const response = await fetch(API_URL + 'genre/movie/list', API_OPTIONS);
        if (!response.ok) {
            return [];
        }
        const genreResponse = await response.json();
        for (const genre of genreResponse.genres) {
            genreData[genre.id] = genre.name;
        }
        setGenres(genreData);
    }

    useEffect(() => {getGenres()}, [])

    return (
        <GenreContext value={genres}>
            {children}
        </GenreContext>
    )
}


export default GenreProvider