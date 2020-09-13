import { RESTDataSource }  from 'apollo-datasource-rest';

const apiUrl = process.env.TMDB_HOST_URL;
const appKey = process.env.TMDB_APP_KEY;

export class TMDBDataSource extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = apiUrl;
    }

    willSendRequest(request) {
        request.params.set('api_key', appKey);
        request.params.set('language', "en-US");
        request.params.set('include_adult', "false");
    }
}
