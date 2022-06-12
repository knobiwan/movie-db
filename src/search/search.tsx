import * as React from "react";

import { DISCOVER_MOVIES, SEARCH_MOVIE } from "../constants";
import "../styles/css/search.css";

const Search = (props: any) => {
    const SubmitSearch = (searchTerm: string, props: any): void => {
        getMoviesBySearchterm(searchTerm).then((result) => {
            props.setMovieData(result.results);
            props.updatePageNumber(result.total_pages);
        });
    };

    const getMoviesBySearchterm = async(searchTerm: string): Promise<any> => {
        let url = searchTerm ? SEARCH_MOVIE + searchTerm : DISCOVER_MOVIES;
        const resp = await fetch(url).then((response) => response.json());
    
        return resp;
    }

    return (
        <div className="search-box">
            <button className="btn-search"><i className="fa fa-search"></i></button>
            <input type="text" className="input-search" placeholder="Type to Search..."
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        SubmitSearch((e.target as HTMLInputElement).value, props);
                        props.searchSubmitEvent(e);
                    }
                }} />
        </div>
    );
};

export default Search;