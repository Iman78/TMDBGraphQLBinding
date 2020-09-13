import { Genre } from "./Genre";

export interface TvShow{
    
    id : number;
    name : string;
    genres : Genre[];
}