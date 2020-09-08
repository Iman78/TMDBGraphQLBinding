export default {
    Query: {
        tvShow: async (_, { id }, {dataSources}) => {
           return await dataSources.TMDBDataSource.getTvShow(id);
        },
    },
}