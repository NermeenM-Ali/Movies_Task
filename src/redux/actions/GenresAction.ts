import { GenresService } from '../../services/api/Genres.service';
import * as types from '../Type'


export const getGenresList = () => {
    return async (dispatch: any) => {
        const GenresServiceApi = new GenresService();
        try {
            GenresServiceApi.GetGenres().then((response: any) => {
                if (response?.genres) {
                    dispatch({
                        type: types.GET_GENRES_LIST,
                        payload: response.genres,
                    })
                }
            })
        } catch (e) {
        }
    }
}
