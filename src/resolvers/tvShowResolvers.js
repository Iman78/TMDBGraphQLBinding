export default {
    Query: {
        tvShow: async (_, { id }, {dataSources}) => {
           return await dataSources.TvShowsDataSource.getTvShow(id);
        },
        searchTvShows : async (_, { query }, {dataSources}) => {
            return await dataSources.TvShowsDataSource.searchTvShows(query);
         },
    },
}