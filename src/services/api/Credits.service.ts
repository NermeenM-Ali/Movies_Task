import { API_KEY } from "../end-pointes.type";
import { WebApi } from "../web-api.service";

export class CreditsService {
    webApi = new WebApi();
    controller = "/movie";

    async GetCreditsByMovieID(movieID: number) {
        return await this.webApi.Get(`${this.controller}/${movieID}/credits?api_key=${API_KEY}`);
    }


}