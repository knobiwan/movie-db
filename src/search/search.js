import { React } from "react";

import { DISCOVER_MOVIES, SEARCH_MOVIE } from "../constants";
import "../styles/css/search.css";

const Search = (props) => {
    // const [searchTerm, setSearchTerm] = useState("");

    return (
        <input
            placeholder="Search"
            // value={searchTerm}
            // onChange={(e) => {
            //     setSearchTerm(e.target.value);
            //     console.log(searchTerm);
            // }}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    SubmitSearch(e.target.value, props);
                    // setSearchTerm(e.target.value);
                }
            }}
        ></input>
    );
};

const SubmitSearch = (searchTerm, props) => {
    getMoviesBySearchterm(searchTerm).then((result) => {
        props.setMovieData(result);
    });
};

async function getMoviesBySearchterm(searchTerm) {
    let url = searchTerm ? SEARCH_MOVIE + searchTerm : DISCOVER_MOVIES;
    const resp = await fetch(url).then((response) => response.json());

    return resp.results;
}

export default Search;
