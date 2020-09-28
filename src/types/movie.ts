import { Genre } from "./genre";

export interface Movie{
    
    id : number;
    title : string;
    genres : Genre[];
    overview : string;
}