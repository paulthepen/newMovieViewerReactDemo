import starImg from '../assets/star.svg';
import MovieDetails from "./MovieDetails.jsx";
import {useState} from "react";
import Transition from "./Transition.jsx";

const MovieCard = ({movie}) => {
    const {title, vote_average, poster_path, release_date} = movie;
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="movie-card" onClick={() => setShowDetails(!showDetails)}>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'no-poster.png'} alt={title}/>
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src={starImg} alt="Star Icon"/>
                        <p>{vote_average? vote_average.toFixed(1): 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className="year">{release_date? release_date.split('-')[0]: 'N/A'}</p>
                </div>
            </div>
            <Transition show={showDetails} animateIn="fadeIn" animateOut="fadeOut">
                <MovieDetails movie={movie} setShowDetails={setShowDetails}/>
            </Transition>
        </div>
    )
}
export default MovieCard