import {useEffect, useState} from "react";
import Transition from "./Transition.jsx";
import MovieDetails from "./MovieDetails.jsx";

const TrendingMovies = () => {
    const [trendingErrorMsg, setTrendingErrorMsg] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([])
    const [activeMovie, setActiveMovie] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const loadTrendingMovies = async () => {
        setTrendingErrorMsg('');
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_OPTIONS = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_KEY}`
            }
        }

        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day`, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }
            const movieDetails = await response.json();

            setTrendingMovies(movieDetails.results.slice(0, 5));
        } catch (error) {
            console.log(error);
            setTrendingErrorMsg('Something went wrong. Please try again later.');
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
                    <li key={movie.id} onClick={() => {setShowPopup(!showPopup); setActiveMovie(movie)}}>
                        <p>{index + 1}</p>
                        <img src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no-poster.png'} alt={movie.title}/>
                    </li>
                ))}
            </ul>
            <Transition show={showPopup} animateIn="fadeIn" animateOut="fadeOut">
                <MovieDetails movie={activeMovie} setShowDetails={setShowPopup}/>
            </Transition>);
        </>
    )
}

export default TrendingMovies;