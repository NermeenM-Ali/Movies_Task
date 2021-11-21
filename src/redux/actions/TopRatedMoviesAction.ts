
import { MoviesService } from '../../services/api/Movies.service';
import * as types from '../Type'


export const fetchTopRatedMovies = () => {
    return async (dispatch: any, getState: any) => {
        const MoviesServiceApi = new MoviesService();
        const { pageIndex } = getState().TopRatedMoviesReducer
        const { isInternetConnectionAvailable } = getState().InternetConnectionReducer
        try {
            if (isInternetConnectionAvailable) {
                MoviesServiceApi.GetTopRatedMovies(pageIndex).then((response: any) => {
                    dispatch({
                        type: types.FETCH_TOP_RATED_MOVIES_SUCCESS,
                        data: response.results,
                        records: response.total_results,
                    })
                }).catch((e) => {
                    dispatch({ type: types.FETCH_TOP_RATED_MOVIES_FAILED })
                })
            } else {
                dispatch({ type: types.FETCH_TOP_RATED_MOVIES_FAILED })
            }
        } catch (e) {
            dispatch({ type: types.FETCH_TOP_RATED_MOVIES_FAILED })
        }
    }
}


export const getTopRatedMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_TOP_RATED_MOVIES_STARTED })
        dispatch(fetchTopRatedMovies())
    }
}

export const refreshTopRatedMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_TOP_RATED_MOVIES_REFRESH })
        dispatch(fetchTopRatedMovies())
    }
}

export const paginateTopRatedMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_TOP_RATED_MOVIES_PAGINATE })
        dispatch(fetchTopRatedMovies())
    }
}



