import {TMDBDataSource} from './TMDBSource';

export class MoviesDataSource extends TMDBDataSource {

    constructor(){ super(); }

    getMovie=async (id)=>{
        const tvShow = await this.get(`movie/${id}`);
        return tvShow;
    }

    searchMovies=async (query, page=1)=>{
        const tvShow = await this.get(`/search/movie?query=${query}&page=${page}`);
        return tvShow;
    }
}