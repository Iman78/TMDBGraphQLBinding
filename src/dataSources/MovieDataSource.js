import {TMDBDataSource} from './TMDBSource.js';

export class TvShowsDataSource extends TMDBDataSource {

    getMovie=async (id)=>{
        const tvShow = await this.get(`movie/${id}`);
        return tvShow;
    }

    searchMovies=async (query)=>{
        const tvShow = await this.get(`/search/movie?query=${query}`);
        return tvShow;
    }
}