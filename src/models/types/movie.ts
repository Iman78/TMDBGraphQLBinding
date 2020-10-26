import { Genre } from "./genre";

export interface Movie{
    
    id : number;
    title : string;
    genres : Genre[];
    overview : string;
    release_date: string;
    original_title: string;
    original_language: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
    video: boolean;
    budget: number;
    homepage: string;
    imdb_id: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
}