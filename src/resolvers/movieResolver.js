export default {
    Query: {
        searchMovies: async (_, params, {dataSources}) => {
           return await dataSources.MoviesDataSource.searchMovies();
        },
        movie: async (_, { id }, {dataSources}) => {
            return await dataSources.TvShowsDataSource.movie(id);
         }
    }
}