import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { DISCOVER_MOVIES } from "./constants.js";
import MovieDetail from "./movie-detail/movie-detail.tsx";
import MovieTile from "./movie-tile/movie-tile.tsx";
import Search from "./search/search.tsx";
import "./styles/css/index.css";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<MovieDetail />} />
            </Routes>
        </Router>
    );
};

const Home = () => {
    const [movies, setMovieData] = useState([]);
    useEffect(() => {
        fetch(DISCOVER_MOVIES)
            .then((res) => res.json())
            .then((json) => {
                setMovieData(json.results);
            });
    }, []);

    return (
        <>
            {movies.length > 0 && (
                <div>
                <header>
                    <Search setMovieData={setMovieData} />
                </header>
                <div className="movies">
                    {movies.map((movie) => (
                        <MovieTile key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
            )}
        </>
    );
};

const container = document.getElementById("main");
const root = createRoot(container);
root.render(<App />);
