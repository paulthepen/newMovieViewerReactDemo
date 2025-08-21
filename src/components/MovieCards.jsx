import MovieCard from "./MovieCard.jsx";

const MovieCards = ({errorMsg, movies}) => (
        <div>
            {errorMsg && (<p className="text-red-500">{errorMsg}</p>)}
            <ul>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </ul>
        </div>
)

export default MovieCards;