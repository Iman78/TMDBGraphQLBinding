import Cache from './cache';
import {getTvGenres} from '../../services/TMDDataLoaders';
import { Genre } from '../../types/Genre';


export const movieGenresCache=new Cache<Genre, number>(getTvGenres);