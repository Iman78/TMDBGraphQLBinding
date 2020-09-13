import {tvGenresCache} from '../core/cache/tvShowGenresCache';

export default {
    TvShow : {
        genres : async (obj)=>{
            const {genre_ids}=obj;
            if(genre_ids.length==0) return [];
            return await tvGenresCache.get(genre_ids);
        }
    },
    Query: {
        tvShow: async (_, { id }, {dataSources}) => {
           return await dataSources.TvShowsDataSource.getTvShow(id);
        },
        searchTvShows : async (_, { query, page}, {dataSources}) => {
            return await dataSources.TvShowsDataSource.searchTvShows(query, page);
         },
    },
}