
import { Movie } from './movie';
import { TvShow } from './tvShow';

export interface SimilarityFactor{
    factorName : string;
    similarityRate : number;
}

export interface SimilarityDbDto{
    firstItemId : number;
    secondItemId : number;
    similarityRate : number;
    date : Date;
    similarityFactors : SimilarityFactor[];
}

export type Item = TvShow | Movie;

export interface ItemSimilarityDto {
    tvShow : TvShow;
    similarityRate : number;

}