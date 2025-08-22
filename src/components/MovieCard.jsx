import starImg from '../assets/star.svg';

const MovieCard = ({movie}) => {
    const {title, vote_average, poster_path, release_date} = movie;
    return (
        <div className="movie-card">
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
        </div>
    )
}

export default MovieCard