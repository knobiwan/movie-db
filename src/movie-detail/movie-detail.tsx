import { useEffect, useState } from "react";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IMG_PATH, MOVIE_CREDITS, MOVIE_DETAILS, STREAMING_PROVIDER } from "../constants.js";
import MovieRate from "../movie-rate/movie-rate";

const MovieDetail = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState<any | undefined>([]);
    const [cast, setCast] = useState<any | undefined>([]);
    const [crew, setCrew] = useState<any | undefined>([]);
    const [streamingProvider, setStreamingProvider] = useState<any | undefined>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const location = useLocation();
    const state = location.state as any;
    const castForDisplay = expanded ? cast : cast.slice(0, 6);

    const getMovieDetails = async(movieId: number): Promise<any> => {
        const url = MOVIE_DETAILS.replace("{movieId}", movieId.toString());
        const resp = await fetch(url).then((response) => response.json());
    
        return resp;
    }

    const getMovieCredits = async(movieId: number):Promise<any> => {
        const url = MOVIE_CREDITS.replace("{movieId}", movieId.toString());
        const resp = await fetch(url).then((response) => response.json());
    
        return resp;
    }

    const getStreamingProvider = async(movieId: number):Promise<any> => {
        const url = STREAMING_PROVIDER.replace("{movieId}", movieId.toString());
        const resp = await fetch(url).then((response) => response.json());
    
        return resp;
    }

    const getMovieCoverPath = (movie: any):string => {
        return movie.poster_path != null
            ? IMG_PATH + movie.poster_path
            : "./assets/no-cover.jpg";
    }

    const getGenres = (movie: any):string => {
        if (!movie.genres) return "";
    
        return movie.genres.map((g: any) => g.name).join(" & ");
    }

    const getLanguageName = (movie: any): string|undefined => {
        if (!movie.original_language) return "";
    
        const regionNamesInEnglish = new Intl.DisplayNames(["de"], {
            type: "language",
        });

        return regionNamesInEnglish.of(movie.original_language);
    }

    const getActorPicturePath = (actor: any): string => {
        return actor.profile_path
            ? IMG_PATH + actor.profile_path
            : "./assets/no-profile.jpg";
    }

    const getProducer = (crew: any[]): string => {
        const directors = crew.filter((c: any) => c.job === 'Director');

        return Array.from(new Set(directors.map((c: any) => c.name))).join(', ');
    }

    const getWriter = (crew: any[]): string => {
        const writers = crew.filter((c: any) => c.department === 'Writing');

        return Array.from(new Set(writers.map((c: any) => c.name))).join(', ');
    }

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
            setCrew(result.crew);
        });
    }, [state.movieId]);

    useEffect(() => {
        const movieId = state.movieId;
        getStreamingProvider(movieId).then((result) => {
            setStreamingProvider(result.results);
        });
    }, [state.movieId]);

    const movieCover = getMovieCoverPath(movie);
    const genres = getGenres(movie);
    const language = getLanguageName(movie);
    const producer = getProducer(crew);
    const writer = getWriter(crew);

    return (
        <>
            {movie.id && (
            <div className="movie">
                <div className="header container">
                    <button className="back" title="Back" onClick={() => {
                        navigate("/"); }}><i className="fa fa-arrow-left"></i>
                    </button>
                </div>
                <div className="movie-head container">
                    <div className="row">
                        <div className="col-md-10">
                            <h1>{movie.title}</h1>
                            <span className="genres">{genres}</span>
                        </div>
                        <div className="col-md-2">
                            <MovieRate key={movie.id} vote_average={movie.vote_average} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img className="movie-poster" src={movieCover} alt={movie.title}></img>
                        </div>
                        <div className="col-md-4">
                            <h2>Handlung</h2>
                            <span>{movie.overview}</span>
                        </div>
                        <div className="col-md-4">
                            <div className="info">
                                <h2>Erschienen</h2>
                                <span>{movie.release_date}</span>
                            </div>
                            <div className="info">
                                <h2>Laufzeit</h2>
                                <span>{movie.runtime} Minuten</span>
                            </div>
                            <div className="info">
                                <h2>Original Sprache</h2>
                                <span>{language}</span>
                            </div>
                            <div className="info">
                                <h2>Regie</h2>
                                <span>{producer}</span>
                            </div>
                            <div className="info">
                                <h2>Drehbuch</h2>
                                <span>{writer}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="actors col-md-12">
                            <h2>Darsteller</h2>
                            <div className="row">
                                {castForDisplay.map((actor: any) => (
                                    <div key={actor.name} className="actor col-sm-6 col-lg-4">
                                        <div className="actor-avatar" style={{backgroundImage: `url(${getActorPicturePath(actor)})`}} />
                                        <div>
                                            <p className="actor-name">{actor.name}</p>
                                            <p className="character-name">{actor.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                <button
                                    type="button"
                                    className="more"
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