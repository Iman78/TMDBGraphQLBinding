import {movieGenresCache} from '../core/cache/movieGenresCache';

export default {
    Movie : {
        genres : async (obj)=>{
            const {genre_ids}=obj;
            if(genre_ids.length==0) return [];
            return await movieGenresCache.get(genre_ids);
        }
    },
    Query: {
        searchMovies: async (_, {query, page}, {dataSources}) => {
           return await dataSources.MoviesDataSource.searchMovies(query, page);
        },
        movie: async (_, { id }, {dataSources}) => {
            return await dataSources.MoviesDataSource.getMovie(id);
         }
    }
}