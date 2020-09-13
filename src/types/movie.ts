import { Genre } from "./Genre";

export interface Movie{
    
    id : number;
    title : string;
    genres : Genre[];
}