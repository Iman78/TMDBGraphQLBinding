import { PaginatedEntity } from 'types/PaginatedEntity';
import {movieGenresCache} from '../core/cache/movieGenresCache';
import { Movie } from './../types/movie';

export default {
    Movie : {
        genres : async (obj)=>{
            const {genre_ids}=obj;
            if(genre_ids.length==0) return [];
            return await movieGenresCache.get(genre_ids);
        }
    },
    Query: {
        searchMovies: async (_, {query, page}, {dataSources}) : Promise<Movie>=> {
           return await dataSources.MoviesDataSource.searchMovies(query, page);
        },
        movie: async (_, { id }, {dataSources}) : Promise<PaginatedEntity<Movie>> => {
            return await dataSources.MoviesDataSource.getMovie(id);
        }
    }
}