import { API_KEY, IMovieDetailsParams } from "../end-pointes.type";
import { WebApi } from "../web-api.service";

export class MoviesService {
    webApi = new WebApi();
    controller = "/movie";

    async GetUpComingMovies(pageIndex: any) {
        return await this.webApi.Get(`${this.controller}/upcoming?api_key=${API_KEY}&page=${pageIndex}`);
    }

    async GetPopularMovies(pageIndex: any) {
        return await this.webApi.Get(`${this.controller}/popular?api_key=${API_KEY}&page=${pageIndex}`);
    }

    async GetTopRatedMovies(pageIndex: any) {
        return await this.webApi.Get(`${this.controller}/top_rated?api_key=${API_KEY}&page=${pageIndex}`);
    }
    async GetMovieByID(params: IMovieDetailsParams) {
        return await this.webApi.Get(`${this.controller}/${params.id}?api_key=${API_KEY}`);
    }

}