import Cache from './cache';
import {getTvGenres} from '../../services/TMDDataLoaders';
import { Genre } from '../../types/genre';


export const movieGenresCache=new Cache<Genre, number>(getTvGenres);