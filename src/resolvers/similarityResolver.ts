
import { ItemTypeEnum } from '../models/types/itemTypeEnum';
import { parseResolveInfo } from 'graphql-parse-resolve-info';

export default {
    Item : {
        __resolveType(obj, context, info){
            if(obj.name){
              return 'TvShow';
            }
      
            if(obj.title){
              return 'Movie';
            }
      
            return null;
          },
    },
    Similarity:{
        item : async (obj, _, context , info) =>{
            if(!context.itemType) throw Error('Item type not set in request context');
            const parsedResolveInfo  = parseResolveInfo(info);
            if( parsedResolveInfo &&
                parsedResolveInfo.fieldsByTypeName[context.ItemType]){
                const requestedFields = Object.keys(parsedResolveInfo.fieldsByTypeName[context.ItemType]);
                if(requestedFields.length==1 && requestedFields[0]=='id') 
                    return {id : obj.itemId}    
            }
            switch(context.itemType){
                case ItemTypeEnum.tvShow:
                    return context.dataSources.TvShowsDataSource.getTvShow(obj.itemId);
                case ItemTypeEnum.movie:
                    return context.dataSources.MoviesDataSource.getMovie(obj.itemId);
                default : console.error('not suppssorted yet !');
            }
        },
        similarityFactors: async (obj, args, context)=>{
            if(!context.itemType) throw Error('Item type not set in request context');
            switch(context.itemType){
                case ItemTypeEnum.tvShow:
                    return context.dataSources.TvshowsSimilarityDataSource.getPairSimilarityFactors(obj.itemId, obj.originalId);
                case ItemTypeEnum.movie:
                    return context.dataSources.MoviesSimilarityDataSource.getPairSimilarityFactors(obj.itemId, obj.originalId);
                default : console.error('not suppssorted yet !');
            }
        } 
    }
}

/*

    TODO :
    - call to datasource is done in the reducer for tvShow that contains the Id
    - move tv Show ( item ) fetching here to similarity resolver
    - resolve similarity factors from the first ID and secondID of the obj in the resolver
    hope this makes sense next time :)

*/