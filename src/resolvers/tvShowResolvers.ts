import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import { PaginatedEntity } from '../models/types/PaginatedEntity';
import { Season } from '../models/types/season';
import { Genre } from '../models/types/genre';
import { tvGenresCache } from '../core/cache/tvShowGenresCache';
import { TvShow } from '../models/types/tvShow';
import { resolveDataHelper } from '../helpers/resolveDataHelper';
import { ItemTypeEnum } from '../models/types/itemTypeEnum';
import { ItemSimilarityDto, SimilarityDbDto } from '../models/types/similarity';

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
        },
        similarShows : async (obj, _, context) : Promise<ItemSimilarityDto[]> => {
            context.itemType= ItemTypeEnum.tvShow;
            return await context.dataSources.TvshowsSimilarityDataSource.getItemSimilarities(obj.id);
        },

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
            const parsedResolveInfo  = parseResolveInfo(info);
            if( parsedResolveInfo && 
                parsedResolveInfo.fieldsByTypeName?.TvShowsPaginated['results'])
            {
                const results = await resolveDataHelper<number, TvShow, TvShow>(
                    parsedResolveInfo.fieldsByTypeName?.TvShowsPaginated['results'].fieldsByTypeName,
                    ItemTypeEnum.tvShow,
                    tvShows.results,
                    dataSources.TvShowsDataSource.getTvShow
                );
                tvShows.results = results ?? tvShows.results;
            }
            return tvShows;
         }
    },
    Mutation : {
        addTvshowsSimilarity :  async (_, { similarity }, {dataSources}) : Promise<SimilarityDbDto> => {
            return await dataSources.TvshowsSimilarityDataSource.createSimilarity(similarity);
        },
        deleteTvShowSimilarityRecord :  async (_, { similarityId }, {dataSources}) : Promise<SimilarityDbDto> => {
                return await dataSources.TvshowsSimilarityDataSource.deleteSimilarityById(similarityId);
        },
    }
}