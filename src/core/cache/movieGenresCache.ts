import Cache from './cache';
import {getTvGenres} from '../../services/TMDDataLoaders';
import { Genre } from '../../models/types/genre';


export const movieGenresCache=new Cache<Genre, number>(getTvGenres);