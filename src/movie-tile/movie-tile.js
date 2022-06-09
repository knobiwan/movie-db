import React from "react";
import { useNavigate } from "react-router-dom";

import { IMG_PATH } from "../constants";
import "../styles/css/movie-tile.css";
import "../styles/css/rate-circle.css";

const MovieTile = (props) => {
    const navigate = useNavigate();
    const rateCircleClass = getRateCircleClass(props.movie);
    const image = getImage(props.movie);

    return (
        <div
            className="movie-tile"
            onClick={() => {
                navigate("/details", { state: { movieId: props.movie.id } });
            }}
        >
            <img src={image} alt={props.movie.title} />
            <div className="movie-info">
                <p>{props.movie.title}</p>
                <div className="rate-circle-wrapper">
                    <span className="rate-circle-foreground">
                        <span className="rate-circle-number">
                            {props.movie.vote_average}
                        </span>
                    </span>
                    <span className={rateCircleClass}></span>
                </div>
            </div>
        </div>
    );
};

function getRateCircleClass(movie) {
    const rateColor =
        movie.vote_average >= 8
            ? "green"
            : movie.vote_average >= 5
            ? "orange"
            : "red";

    const nmb = Math.ceil((movie.vote_average * 10) / 5) * 5;
    const bigClass = movie.vote_average > 5 ? "rate-circle-big" : "";
    return `rate-circle rate-circle-${nmb} ${bigClass} ${rateColor}`;
}

function getImage(movie) {
    return movie.poster_path != null
        ? IMG_PATH + movie.poster_path
        : "./assets/no-cover.jpg";
}

export default MovieTile;
