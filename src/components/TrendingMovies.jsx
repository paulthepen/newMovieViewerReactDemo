import {getTrendingMovies} from "../appwrite.js";
import {useEffect, useState} from "react";

const TrendingMovies = () => {
    const [trendingErrorMsg, setTrendingErrorMsg] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([])

    const loadTrendingMovies = async () => {
        setTrendingErrorMsg('');
        try {
            setTrendingMovies(await getTrendingMovies());
        } catch (msg) {
            console.log(msg);
            setTrendingErrorMsg(`No trending movies available.`);
        }
    }

    useEffect(() => {
        loadTrendingMovies();
    }, [])

    return (
        <>
            {trendingErrorMsg && (<p className="text-red-500">{trendingErrorMsg}</p>)}
            <ul>
                {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}>
                        <p>{index + 1}</p>
                        <img src={movie.poster_url} alt={movie.title}/>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TrendingMovies;