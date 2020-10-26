import { FieldsByTypeName, ResolveTree } from "graphql-parse-resolve-info";
import { ItemTypeEnum } from 'models/types/itemTypeEnum';

const extraFieldNames = {
    TvShow : ['episode_run_time', 'number_of_episodes', 'number_of_seasons', 'status', 'type', 'homepage', 'in_production', 'languages', 'last_air_date', 'last_episode_to_air', 'next_episode_to_air', 'seasons', 'networks'],
    Movie : ['genres', 'budget', 'homepage', 'imdb_id','revenue', 'runtime', 'status', 'tagline'],
}

export const resolveDataHelper = async <ID, D extends {id : ID}, R> (  
        parsedDirectTypeInfo : void | ResolveTree | FieldsByTypeName,
        itemType : ItemTypeEnum,
        data : D[],
        itemFetchMethod : (id : ID)=>R) : Promise<R[]|null>=>{
    if(extraFieldNames[itemType].some(entry => (Object.keys(parsedDirectTypeInfo[itemType]).includes(entry))))
    {
        const detailedTvShows= await Promise.all( data.map(async tvShow => 
            (await itemFetchMethod(tvShow.id))));
        return detailedTvShows;
    }
}