import {TMDBDataSource} from './TMDBSource';

export class TvShowsDataSource extends TMDBDataSource {

    constructor(){ super(); }

    getTvShow=async (id)=>{
        const tvShow = await this.get(`tv/${id}`);
        return tvShow;
    }

    searchTvShows=async (query, page=1)=>{
        const tvShow = await this.get(`/search/tv?query=${query}&page=${page}`);
        return tvShow;
    }
}