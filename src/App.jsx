import './App.css'
import Search from "./components/Search.jsx";
import {useState, useEffect, useRef} from "react";
import Loading from "./components/Loading.jsx";
import TrendingMovies from "./components/TrendingMovies.jsx";
import MovieCards from "./components/MovieCards.jsx";
import heroImg from './assets/hero-img.png'; //


const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncer = useRef(null);


    const fetchMovies = async (query = '') => {
        setErrorMsg('');
        try {
            let endpoint = API_URL;
            if (query) {
                endpoint += 'search/movie?include_adult=false&include_video=false&language=en-US&page=1&query=';
                endpoint += encodeURIComponent(query);
                endpoint += '&sort_by=primary_release_date.desc, popularity.desc'
            } else {
                endpoint += 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc, popularity.desc';
            }
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const movieInfo = await response.json();

            if (movieInfo.Response === 'False') {
                setErrorMsg(movieInfo.Error || 'Failed to fetch movies. Please try again later.');
            }

            setMovies(movieInfo.results);
        } catch (error) {
            console.log(error);
            setErrorMsg('Something went wrong. Please try again later.');
        }
    }


    useEffect(() => {
        setIsLoading(true);
            if (debouncer.current) {
                clearTimeout(debouncer.current);
            }
            debouncer.current = setTimeout(() => {
                fetchMovies(searchTerm);
                setIsLoading(false);
            }, 1000)
    }, [searchTerm])

return (
    <main>
        <div className="pattern">
            <div className="wrapper">
                <header>
                    <img src={heroImg} alt="Hero Banner"/>
                    <h1 className="text-4xl font-bold">Find <span className="text-gradient">Movies</span> You'll Enjoy
                        Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>

                <section className="trending">
                    <h2>Trending Movies</h2>
                    <TrendingMovies />
                </section>

                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? <Loading/> : <MovieCards errorMsg={errorMsg} movies={movies}/>}
                </section>
            </div>
        </div>
    </main>
  )
}

export default App
