import { MoviesService } from '../../services/api/Movies.service';
import * as types from '../Type'

export const getMovieByID = (movieID: number) => {
    return async (dispatch: any) => {
        const MoviesServiceApi = new MoviesService();
        dispatch(changeDetailsProp('isMovieDetailsLoading', true))
        try {
            MoviesServiceApi.GetMovieByID({ id: movieID }).then((response: any) => {
                if (response) {
                    dispatch({
                        type: types.GET_MOVIE_BY_ID_SUCCESS,
                        payload: response
                    })
                } else {
                    dispatch({ type: types.GET_MOVIE_BY_ID_FAIL })
                }

            })
        } catch (e) {
            dispatch({ type: types.GET_MOVIE_BY_ID_FAIL })
        }
    }
}


export const changeDetailsProp = (prop: any, value: any) => {
    return {
        type: types.CHANGE_DETAILS_PROPS,
        prop,
        value
    }
}

export const clearDetails = () => {
    return (dispatch: any) => {
        dispatch(changeDetailsProp('moviesDetails', {}))
    }
}
