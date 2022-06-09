export const API_KEY = "api_key=98a315c12601a2ffeecdd86990b00e3e";
export const API_BASE_URL = "https://api.themoviedb.org/3";
export const DISCOVER_MOVIES =
    API_BASE_URL + "/discover/movie?sortby=popularity.desc&" + API_KEY;
export const MOVIE_DETAILS = API_BASE_URL + "/movie/{movieId}?" + API_KEY;
export const MOVIE_CREDITS =
    API_BASE_URL + "/movie/{movieId}/credits?" + API_KEY;
export const GENRE = API_BASE_URL + "/genre/movie/list?" + API_KEY;
export const SEARCH_MOVIE =
    API_BASE_URL + "/search/movie?" + API_KEY + "&query=";
export const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
