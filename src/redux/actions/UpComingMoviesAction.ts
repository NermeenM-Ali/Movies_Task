
import { MoviesService } from '../../services/api/Movies.service';
import * as types from '../Type'


export const fetchUpComingMovies = () => {
    return async (dispatch: any, getState: any) => {
        const MoviesServiceApi = new MoviesService();
        const { pageIndex } = getState().UpComingMoviesReducer
        const { isInternetConnectionAvailable } = getState().InternetConnectionReducer
        try {
            if (isInternetConnectionAvailable) {
                MoviesServiceApi.GetUpComingMovies(pageIndex).then((response: any) => {
                    dispatch({
                        type: types.FETCH_UP_COMING_MOVIES_SUCCESS,
                        data: response.results,
                        records: response.total_results,
                    })
                }).catch((e) => {
                    dispatch({ type: types.FETCH_UP_COMING_MOVIES_FAILED })
                })
            } else {
                dispatch({ type: types.FETCH_UP_COMING_MOVIES_FAILED })
            }
        } catch (e) {
            dispatch({ type: types.FETCH_UP_COMING_MOVIES_FAILED })
        }
    }
}


export const getUpComingMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_UP_COMING_MOVIES_STARTED })
        dispatch(fetchUpComingMovies())
    }
}

export const refreshUpComingMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_UP_COMING_MOVIES_REFRESH })
        dispatch(fetchUpComingMovies())
    }
}

export const paginateUpComingMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_UP_COMING_MOVIES_PAGINATE })
        dispatch(fetchUpComingMovies())
    }
}



