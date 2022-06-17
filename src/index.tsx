import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { DISCOVER_MOVIES, SEARCH_MOVIE } from "./constants.js";
import MovieDetail from "./movie-detail/movie-detail";
import MovieCard from "./movie-card/movie-card";
import Pagination from "./pagination/pagination";
import Search from "./search/search";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(DISCOVER_MOVIES)
            .then((res) => res.json())
            .then((json) => {
                setMovieData(json.results);
            });
    }, []);

    const handlePageChange = async (activePage: number) => {
        setCurrentPage(activePage);

        let url = searchTerm
            ? SEARCH_MOVIE + searchTerm + "&page=" + activePage
            : DISCOVER_MOVIES;
        await fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setMovieData(json.results);
            });
    };
    const searchSubmitEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setSearchTerm((event.target as HTMLInputElement).value);
    };
    const updatePageNumber = (event: number) => setPageNumber(event);

    return (
        <>
            <header>
                <Search
                    setMovieData={setMovieData}
                    searchSubmitEvent={searchSubmitEvent}
                    updatePageNumber={updatePageNumber}
                />
            </header>
            {movies.length > 0 && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={pageNumber}
                                pageSize={1}
                                onPageChange={(page: number) => handlePageChange(page)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="movies col-md-12">
                            {movies.map((movie: any) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const container = document.getElementById("main");
if(container){
    const root = createRoot(container);
    root.render(<App />);    
}