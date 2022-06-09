import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IMG_PATH, MOVIE_CREDITS, MOVIE_DETAILS } from "../constants";
import "../styles/css/movie-detail.css";

const MovieDetail = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const castForDisplay = expanded ? cast.slice(0, 10) : cast.slice(0, 5);
    const { state } = useLocation();

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
    const productionCountries = getProductionCountries(movie);
    const language = getLanguageName(movie);

    return (
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
                            {castForDisplay.map((event, index) => (
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
    );
};

async function getMovieDetails(movieId) {
    const url = MOVIE_DETAILS.replace("{movieId}", movieId);
    const resp = await fetch(url).then((response) => response.json());

    return resp;
}

async function getMovieCredits(movieId) {
    const url = MOVIE_CREDITS.replace("{movieId}", movieId);
    const resp = await fetch(url).then((response) => response.json());

    return resp;
}

function getImage(movie) {
    return movie.poster_path != null
        ? IMG_PATH + movie.poster_path
        : "./assets/no-cover.jpg";
}

function getGenres(movie) {
    if (!movie.genres) return "";

    return movie.genres.map((g) => g.name).join(" & ");
}

function getProductionCountries(movie) {
    if (!movie.production_countries) return "";

    return movie.production_countries.map((c) => c.name).join(", ");
}

function getLanguageName(movie) {
    if (!movie.original_language) return "";

    const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
        type: "language",
    });
    return regionNamesInEnglish.of(movie.original_language);
}

export default MovieDetail;
