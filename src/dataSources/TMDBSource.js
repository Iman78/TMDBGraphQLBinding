

const apiUrl = process.env.PORT;

class TMDBDataSource extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = apiUrl;
    }

    willSendRequest(request) {
        request.params.set('api_key', );
        request.params.set('language', this.context.appKey);
      }

    getTvShow=async (id)=>{
        const tvShow = await this.get(`tv/${id}`);
        return tvshow;
    }
    getTvGenres=async ()=>{
        const tvShow = await this.get(`genre/tv/list`);
        return tvshow;
    }
}
