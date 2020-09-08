export default {
    Query: {
        genres: async (_, params, {dataSources}) => {
           return await dataSources.TMDBDataSource.getGenres();
        },
    },
}