import React from "react";
import { useNavigate } from "react-router-dom";

import { IMG_PATH } from "../constants.js";
import MovieRate from "../movie-rate/movie-rate";

const MovieCard = (props: any) => {
    const navigate = useNavigate();

    const getImage = (movie: any): string => {
        return movie.poster_path != null
        ? IMG_PATH + movie.poster_path
        : "./assets/no-cover.jpg";
    }

    const image = getImage(props.movie);

    return (
        <div
            className="movie-card"
            onClick={() => {
                navigate("/details", { state: { movieId: props.movie.id } });
            }}
        >
            <img src={image} alt={props.movie.title} />
            <div className="movie-info">
                <p>{props.movie.title}</p>
                <MovieRate key={props.movie.id} vote_average={props.movie.vote_average} minimum={true}/>
            </div>
        </div>
    );
};

export default MovieCard;
