export default {
    Query: {
        tvGenres: async (_, params, {dataSources}) => {
           return await dataSources.GenresDataSource.getTvGenres();
        },
    },
}