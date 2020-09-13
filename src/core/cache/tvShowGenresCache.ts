import Cache from './cache';
import {getMovieGenres} from '../../services/TMDDataLoaders';
import { Genre } from '../../types/Genre';


export const tvGenresCache=new Cache<Genre, number>(getMovieGenres);