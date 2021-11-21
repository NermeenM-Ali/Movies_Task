import { API_KEY } from "../end-pointes.type";
import { WebApi } from "../web-api.service";

export class GenresService {
    webApi = new WebApi();
    controller = "/genre/movie/list";

    async GetGenres() {
        return await this.webApi.Get(`${this.controller}?api_key=${API_KEY}`);
    }


}