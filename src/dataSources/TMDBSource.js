import { RESTDataSource }  from 'apollo-datasource-rest';

const apiUrl = process.env.TMDB_HOST_URL;

export class TMDBDataSource extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = apiUrl;
    }

    willSendRequest(request) {
        request.params.set('api_key', this.context.appKey);
        request.params.set('language', "en-US");
    }
}
