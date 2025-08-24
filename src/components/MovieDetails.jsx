import {useEffect, useState} from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const MovieDetails = ({movie, setShowDetails}) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [video, setVideo] = useState('');

    const getMovieTrailer = async () => {
        setErrorMsg('');
        try {
            const endpoint = 'https://api.themoviedb.org/3/movie/'+movie.id+'/videos';
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }

            const video = await response.json();

            if (video.Response === 'False') {
                setErrorMsg(video.Error || 'Failed to fetch trailer. Please try again later.');
            }

            for(let vidData of video.results) {
                if (vidData.type === "Trailer" && vidData.site === "YouTube") {
                    setVideo("https://youtube.com/embed/" + vidData.key);
                    break;
                }
            }
        } catch (error) {
            console.log(error);
            setErrorMsg('Something went wrong. Please try again later.');
        }
    }

    useEffect(() => {
        getMovieTrailer();
    }, [])

    return (
        <>
            <div className="detailBg fixed top-0 left-0 w-full h-full bg-black opacity-40" onClick={() => {setShowDetails(false)}}></div>
            <div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center" onClick={() => {setShowDetails(false)}}>
                <div className="movie-details movie-card max-w-full sm:max-w-3/4 md:max-w-1/2 max-h-sm lg:max-h-lg top-20 flex justify-center items-center text-white">
                    <div className="movie-details-content flex flex-col lg:flex-row gap-3 items-center">
                        <div className="poster-container max-sm:max-w-[200px] w-1/2 lg:w-1/3">
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no-poster.png'} alt={movie.title}/>
                        </div>
                        <div className="movie-details-body w-full md:w-2/3">
                            <div className="movie-details-header">
                                <h2>{movie.title}</h2>
                                <p className="font-bold">Release Date: {movie.release_date}</p>
                            </div>
                            <div className="mt-3">
                                <p className="max-lg:line-clamp-6">{movie.overview}</p>
                                {errorMsg ? (<p className="text-red-500">{errorMsg}</p>): (
                                    <div className="movie-details-trailer w-full h-auto flex justify-center mt-5 lg:p-5">
                                        {video && (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={video}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetails