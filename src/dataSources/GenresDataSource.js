import {TMDBDataSource} from './TMDBSource.js';

export class GenresDataSource extends TMDBDataSource {

    getTvGenres=async ()=>{
        const genres = await this.get(`genre/tv/list`);
        return genres.genres;
    }
}