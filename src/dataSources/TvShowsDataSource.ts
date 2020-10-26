import {TMDBDataSource} from './TMDBSource';
import { TvShow } from '../models/types/tvShow';
import { PaginatedEntity } from 'models/types/PaginatedEntity';
import { Episode } from '../models/types/episode';
import { Season } from 'models/types/season';

export class TvShowsDataSource extends TMDBDataSource {

    constructor(){ super(); }

    getTvShow=async (id) : Promise<TvShow>=>{
        const tvShow : TvShow= await this.get(`tv/${id}`);
        return tvShow;
    }

    searchTvShows=async (query, page=1) : Promise<PaginatedEntity<TvShow>>=>{
        const tvShow : PaginatedEntity<TvShow>= await this.get(`/search/tv?query=${query}&page=${page}`);
        return tvShow;
    }

    getEpisode = async (tvShowId, seasonId, episodeId) : Promise<Episode>=>{
        const episode  : Episode= await this.get(`/tv/${tvShowId}/season/${seasonId}/episode/${episodeId}`);
        return episode;
        
    }


    getSeason = async (tvShowId, seasonId) : Promise<Season>=>{
        const season : Season = await this.get(`/tv/${tvShowId}/season/${seasonId}`, null, {cacheOptions: { ttl: 60 } });
        return season;
        
    }
}