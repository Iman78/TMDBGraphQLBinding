import {TMDBDataSource} from './TMDBSource.js';

export class TvShowsDataSource extends TMDBDataSource {

    getTvShow=async (id)=>{
        const tvShow = await this.get(`tv/${id}`);
        return tvShow;
    }

    searchTvShows=async (query)=>{
        const tvShow = await this.get(`/search/tv?query=${query}`);
        return tvShow;
    }
}