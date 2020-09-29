import { parseResolveInfo } from 'graphql-parse-resolve-info';
import { PaginatedEntity } from 'types/PaginatedEntity';
import {movieGenresCache} from '../core/cache/movieGenresCache';
import { Movie } from './../types/movie';

export default {
    Movie : {
        genres : async (obj)=>{
            const {genre_ids}=obj;
            if(obj.genres) return obj.genres;
            if(!genre_ids || genre_ids.length==0) return [];
            return await movieGenresCache.get(genre_ids);
        }
    },
    Query: {
        searchMovies: async (_, { query, page}, {dataSources}, info) : Promise<PaginatedEntity<Movie>> => {
            const tvShows : PaginatedEntity<Movie>= await dataSources.MoviesDataSource.searchMovies(query, page);
            const extraFieldNames = ['budget', 'homepage', 'imdb_id', 'status', 'revenue', 'runtime', 'tagline'];
            const parsedResolveInfo  = parseResolveInfo(info);
            if( parsedResolveInfo && 
                parsedResolveInfo.fieldsByTypeName?.MoviesPaginated['results'] && 
                extraFieldNames.some(entry => (Object.keys(parsedResolveInfo.fieldsByTypeName?.MoviesPaginated['results'].fieldsByTypeName?.Movie).includes(entry))))
            {
                const detailedTvShows= await Promise.all( tvShows.results.map(async tvShow => 
                    (await dataSources.MoviesDataSource.getMovie(tvShow.id))));
                tvShows.results = detailedTvShows;
            }
            return tvShows;
         },
        movie: async (_, { id }, {dataSources}) : Promise<PaginatedEntity<Movie>> => {
            return await dataSources.MoviesDataSource.getMovie(id);
        }
    }
}