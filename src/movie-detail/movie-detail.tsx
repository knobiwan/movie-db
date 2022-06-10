import { useEffect, useState } from "react";
import * as React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { IMG_PATH, MOVIE_CREDITS, MOVIE_DETAILS } from "../constants";
import "../styles/css/movie-detail.css";

const MovieDetail = () => {
    // const navigate = useNavigate();
    const [movie, setMovie] = useState<any | undefined>([]);
    const [cast, setCast] = useState<any | undefined>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const { state } = useLocation();
    const castForDisplay = expanded ? cast.slice(0, 10) : cast.slice(0, 5);

    const getMovieDetails = async(movieId: number): Promise<JSON> => {
        const url = MOVIE_DETAILS.replace("{movieId}", movieId.toString());
        const resp = await fetch(url).then((response) => response.json());
    
        return resp;
    }

    const getMovieCredits = async(movieId: number) => {
        const url = MOVIE_CREDITS.replace("{movieId}", movieId.toString());
        const resp = await fetch(url).then((response) => response.json());
    
        return resp;
    }

    const getImage = (movie: any) => {
        return movie.poster_path != null
            ? IMG_PATH + movie.poster_path
            : "./assets/no-cover.jpg";
    }

    const getGenres = (movie: any) => {
        if (!movie.genres) return "";
    
        return movie.genres.map((g: any) => g.name).join(" & ");
    }

    const getLanguageName = (movie: any) => {
        if (!movie.original_language) return "";
    
        const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
            type: "language",
        });
        return regionNamesInEnglish.of(movie.original_language);
    }

// const getProductionCountries = (movie) => {
//     if (!movie.production_countries) return "";

//     return movie.production_countries.map((c) => c.name).join(", ");
// }

    useEffect(() => {
        const movieId = state.movieId;
        getMovieDetails(movieId).then((result) => {
            setMovie(result);
        });
    }, [state.movieId]);

    useEffect(() => {
        const movieId = state.movieId;
        getMovieCredits(movieId).then((result) => {
            setCast(result.cast);
        });
    }, [state.movieId]);

    // console.log(movie);
    // console.log(cast);
    const image = getImage(movie);
    const genres = getGenres(movie);
    // const productionCountries = getProductionCountries(movie);
    const language = getLanguageName(movie);

    return (
        <>
            {movie.id && (
                <div className="movie">
                <div className="movie-head">
                    <div>
                        <h1>{movie.title}</h1>
                        <span className="genres">{genres}</span>
                    </div>
                    <div className="vote-average">
                        <span className="vote">{movie.vote_average}</span>
                        <span> / 10</span>
                    </div>
                </div>
                <div className="movie-infos">
                    {/* <div className="img-gradient"> */}
                    <img src={image} alt={movie.title}></img>
                    {/* </div> */}
                    <div className="movie-description">
                        <div>
                            <h2>About the Movie</h2>
                            <span>{movie.overview}</span>
                        </div>
                        <div className="other-infos">
                            <div>
                                <h3>Release Date</h3>
                                <div>{movie.release_date}</div>
                                <h3>Runtime</h3>
                                <span>{movie.runtime} seconds</span>
                                <h3>Language</h3>
                                <span>{language}</span>
                            </div>
                            <div className="actors">
                                <h3>Actors</h3>
                                {castForDisplay.map((event: any) => (
                                    <span key={event.name}>{event.name}</span>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {expanded ? "Less" : "More"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
};

export default MovieDetail;
