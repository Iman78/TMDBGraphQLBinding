import { parseResolveInfo } from 'graphql-parse-resolve-info';
import { resolveDataHelper } from '../helpers/resolveDataHelper';
import { ItemTypeEnum } from '../models/types/itemTypeEnum';
import { PaginatedEntity } from '../models/types/PaginatedEntity';
import {movieGenresCache} from '../core/cache/movieGenresCache';
import { Movie } from '../models/types/movie';
import { ItemSimilarityDto, SimilarityDbDto } from 'models/types/similarity';

export default {
    Movie : {
        genres : async (obj)=>{
            const {genre_ids}=obj;
            if(obj.genres) return obj.genres;
            if(!genre_ids || genre_ids.length==0) return [];
            return await movieGenresCache.get(genre_ids);
        },
        similarMovies : async (obj, _, context) : Promise<ItemSimilarityDto[]> => {
            context.itemType= ItemTypeEnum.movie;
            return await context.dataSources.MoviesSimilarityDataSource.getItemSimilarities(obj.id);
        },
    },
    Query: {
        searchMovies: async (_, { query, page}, {dataSources}, info) : Promise<PaginatedEntity<Movie>> => {
            const movies : PaginatedEntity<Movie>= await dataSources.MoviesDataSource.searchMovies(query, page);
            const parsedResolveInfo  = parseResolveInfo(info);
            if( parsedResolveInfo && 
                parsedResolveInfo.fieldsByTypeName?.MoviesPaginated['results'] )
            {
                const results = await resolveDataHelper<number, Movie, Movie>(
                    parsedResolveInfo.fieldsByTypeName?.MoviesPaginated['results'].fieldsByTypeName,
                    ItemTypeEnum.movie,
                    movies.results,
                    dataSources.MoviesDataSource.getMovie
                );
                movies.results = results ?? movies.results;
            }
            return movies;
         },
        movie: async (_, { id }, {dataSources}) : Promise<PaginatedEntity<Movie>> => {
            return await dataSources.MoviesDataSource.getMovie(id);
        }
    },
    Mutation : {
        addMoviesSimilarity :  async (_, { similarity }, {dataSources}) : Promise<SimilarityDbDto> => {
            return await dataSources.MoviesSimilarityDataSource.createSimilarity(similarity);
        },
        deleteMovieSimilarityRecord :  async (_, { similarityId }, {dataSources}) : Promise<SimilarityDbDto> => {
            return await dataSources.MoviesSimilarityDataSource.deleteSimilarityById(similarityId);
        },
    }
} 