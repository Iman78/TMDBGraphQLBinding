import { Movie } from 'types/movie';
import { PaginatedEntity } from 'types/PaginatedEntity';
import {TMDBDataSource} from './TMDBSource';

export class MoviesDataSource extends TMDBDataSource {

    constructor(){ super(); }

    getMovie=async (id) : Promise<Movie>=>{
        const tvShow : Movie= await this.get(`movie/${id}`);
        return tvShow;
    }

    searchMovies=async (query, page=1) : Promise<PaginatedEntity<Movie>>=>{
        const tvShow : PaginatedEntity<Movie>= await this.get(`/search/movie?query=${query}&page=${page}`);
        return tvShow;
    }
}