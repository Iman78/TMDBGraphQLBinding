import { DataSource }  from 'apollo-datasource';
import { BusinessException } from '../core/excpetions/BusinessException';
import { ISimilaritySchema } from '../models/mongoSchemas/similaritySchema';
import { ItemTypeEnum } from '../models/types/itemTypeEnum';
import { SimilarityDbDto, SimilarityFactor } from '../models/types/similarity';
import { Model, Types } from 'mongoose';


export class SimilarityDataSource extends DataSource {
    private similarityModel : Model<ISimilaritySchema>;
    private itemType : ItemTypeEnum;

    constructor(similarityModel : Model<ISimilaritySchema>, itemType : ItemTypeEnum) {
      super();
      this.similarityModel = similarityModel;
      this.itemType = itemType;
    }

    getPairSimilarityFactors= async (firstItemId : number, secondItemId : number) =>{
        const similarities = await this.similarityModel.find({ 
            $or : [
            {firstItemId : firstItemId, secondItemId : secondItemId}, 
            {firstItemId : secondItemId, secondItemId : firstItemId}
        ]});
        if(similarities.length==0) throw new BusinessException(`No similarity between ${this.itemType}s with ids ${firstItemId} and ${firstItemId} could be found.`);
        const result = await this.similarityModel.aggregate<SimilarityFactor>([
            { $match : { $or : [
                {firstItemId : firstItemId, secondItemId : secondItemId}, 
                {firstItemId : secondItemId, secondItemId : firstItemId}, 
            ]}},
            { $unwind : { "path": "$similarityFactors", "preserveNullAndEmptyArrays": true } },
            { $group : {  
                _id : "$similarityFactors.factorName",
                factorSimilarityRate : { $avg: "$similarityFactors.similarityRate" }
            }},
            { $project : { _id :0, factorName: "$_id", similarityRate : "$factorSimilarityRate" }}
        ]);
        return result;
    }

    getItemSimilarities= async (itemId : number) =>{
        const result = await this.similarityModel.aggregate([
            { $match : { $or : [
                {firstItemId : itemId}, 
                {secondItemId : itemId}, 
            ]}},
            { $group : {  
                _id : {
                    $cond : [{
                        $eq : [ "$firstItemId", itemId]
                    }, "$secondItemId", "$firstItemId"]
                },
                similarityRate : { $avg: "$similarityRate" }
            }},
            { $project : { _id :0, itemId: "$_id", similarityRate : "$similarityRate" }}
        ]);
        return result.map(e=>({...e, originalId : itemId}));
    }

    createSimilarity= async (tvShowSimilarityDto : SimilarityDbDto) : Promise<ISimilaritySchema> =>{
        const model : SimilarityDbDto = {...tvShowSimilarityDto, date : new Date()};
        const result = await this.similarityModel.create(model);
        return result.toObject();
    }

    deleteSimilarityById= async (id : string) :Promise<ISimilaritySchema> =>{
        const result = await this.similarityModel.findOneAndDelete({
            _id :  Types.ObjectId(id)
        });
        if(!result) throw new BusinessException(`No record of similaritywith id ${id} between ${this.itemType}s could be found.`)
        return result.toObject();
    }


}
