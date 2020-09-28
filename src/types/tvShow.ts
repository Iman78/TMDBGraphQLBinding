import { Episode } from './episode';
import { Genre } from './genre';
import { Network } from './network';
import { Season } from './season';

export interface TvShow{
    id : number;
    name : string;
    genres : Genre[];
    overview : string;
    episode_run_time : number;
    popularity : number;
    number_of_episodes: number;
    number_of_seasons: number;
    status: string;
    type: string;
    vote_average: number;
    vote_count: number;
    first_air_date : string;
    homepage: string;
    in_production: Boolean;
    languages: string[];
    origin_country: string[];
    original_language: string;
    poster_path: string;
    last_air_date: string;
    last_episode_to_air: Episode;
    next_episode_to_air: Episode;
    backdrop_path: string;
    seasons: Season[];
    networks: Network[];
}
