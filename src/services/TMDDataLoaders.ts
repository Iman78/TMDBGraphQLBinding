import axios from 'axios';
import { Genre } from '../models/types/genre';

const apiUrl = process.env.TMDB_HOST_URL;
const appKey = process.env.TMDB_APP_KEY;



export const getTvGenres = async () : Promise<Genre[]> => {
    return axios.get(`${apiUrl}/genre/tv/list`, {params: {
        api_key : appKey,
        language : 'en-US'
    }}).then(res=>{return res.data.genres});
};

export const getMovieGenres = async () : Promise<Genre[]> => {
    return axios.get(`${apiUrl}/genre/movie/list`, {params: {
        api_key : appKey,
        language : 'en-US'
    }}).then(res=>{return res.data.genres});
};