import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import { PaginatedEntity } from 'types/PaginatedEntity';
import { Season } from './../types/season';
import { Genre } from './../types/genre';
import { tvGenresCache } from './../core/cache/tvShowGenresCache';
import { TvShow } from './../types/tvShow';

export default {
    TvShow : { 
        genres : async (obj) : Promise<Genre[]>=>{
            const {genre_ids}=obj;
            if(obj.genres) return obj.genres;
            if(!genre_ids || genre_ids.length==0) return [];
            return await tvGenresCache.get(genre_ids);
        },
        seasons : async (obj, _, {dataSources} , info) : Promise<Season[]> => {
            const parsedResolveInfo  = parseResolveInfo(info);

            if( parsedResolveInfo &&
                parsedResolveInfo.fieldsByTypeName.Season['episodes']){
                return await Promise.all(obj.seasons.map(async season => 
                    (await dataSources.TvShowsDataSource.getSeason(obj.id, season.season_number))));
                }
            return obj.seasons;
        }
    },
    Season : {
        episode_count : (obj) : number=>{
            const { episode_count, episodes } = obj;
            return episode_count ? episode_count : episodes ? obj.episodes.length : null ;
        }
    },
    Query: {
        tvShow: async (_, { id }, {dataSources}) : Promise<TvShow> => {
           return await dataSources.TvShowsDataSource.getTvShow(id);
        },
        searchTvShows : async (_, { query, page}, {dataSources}, info) : Promise<PaginatedEntity<TvShow>> => {
            const tvShows : PaginatedEntity<TvShow>= await dataSources.TvShowsDataSource.searchTvShows(query, page);
            const extraFieldNames = ['episode_run_time', 'number_of_episodes', 'number_of_seasons', 'status', 'type', 'homepage', 'in_production', 'languages', 'last_air_date', 'last_episode_to_air', 'next_episode_to_air', 'seasons', 'networks'];
            const parsedResolveInfo  = parseResolveInfo(info);
            if( parsedResolveInfo && 
                parsedResolveInfo.fieldsByTypeName?.TvShowsPaginated['results'] && 
                extraFieldNames.some(entry => (Object.keys(parsedResolveInfo.fieldsByTypeName?.TvShowsPaginated['results'].fieldsByTypeName?.TvShow).includes(entry))))
            {
                const detailedTvShows= await Promise.all( tvShows.results.map(async tvShow => 
                    (await dataSources.TvShowsDataSource.getTvShow(tvShow.id))));
                tvShows.results = detailedTvShows;
            }
            return tvShows;
         }
    },
}