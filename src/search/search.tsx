import * as React from "react";

import { DISCOVER_MOVIES, SEARCH_MOVIE } from "../constants";
import "../styles/css/search.css";

const Search = (props: any) => {
    // const [searchTerm, setSearchTerm] = useState("");

    const SubmitSearch = (searchTerm: string, props: any): void => {
        getMoviesBySearchterm(searchTerm).then((result) => {
            props.setMovieData(result);
        });
    };

    const getMoviesBySearchterm = async(searchTerm: string): Promise<JSON> => {
        let url = searchTerm ? SEARCH_MOVIE + searchTerm : DISCOVER_MOVIES;
        const resp = await fetch(url).then((response) => response.json());
    
        return resp.results;
    }

    return (
        <div className="search-box">
            <button className="btn-search"><i className="fa fa-search"></i></button>
            <input type="text" className="input-search" placeholder="Type to Search..."
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        SubmitSearch((e.target as HTMLInputElement).value, props);
                        // setSearchTerm(e.target.value);
                    }
                    }} />
        </div>
        // <input
        //     placeholder="Search"
        //     // value={searchTerm}
        //     // onChange={(e) => {
        //     //     setSearchTerm(e.target.value);
        //     //     console.log(searchTerm);
        //     // }}
        //     onKeyPress={(e) => {
        //         if (e.key === "Enter") {
        //             SubmitSearch((e.target as HTMLInputElement).value, props);
        //             // setSearchTerm(e.target.value);
        //         }
        //     }}
        // ></input>
    );
};

export default Search;