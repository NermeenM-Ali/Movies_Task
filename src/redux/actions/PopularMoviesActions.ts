
import { MoviesService } from '../../services/api/Movies.service';
import * as types from '../Type'


export const fetchPopularMovies = () => {
    return async (dispatch: any, getState: any) => {
        const MoviesServiceApi = new MoviesService();
        const { pageIndex } = getState().PopularMoviesReducer
        const { isInternetConnectionAvailable } = getState().InternetConnectionReducer
        try {
            if (isInternetConnectionAvailable) {
                MoviesServiceApi.GetPopularMovies(pageIndex).then((response: any) => {
                    dispatch({
                        type: types.FETCH_POPULAR_MOVIES_SUCCESS,
                        data: response.results,
                        records: response.total_results,
                    })
                }).catch((e) => {
                    dispatch({ type: types.FETCH_POPULAR_MOVIES_FAILED })
                })
            } else {
                dispatch({ type: types.FETCH_POPULAR_MOVIES_FAILED })
            }
        } catch (e) {
            dispatch({ type: types.FETCH_POPULAR_MOVIES_FAILED })
        }
    }
}


export const getPopularMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_POPULAR_MOVIES_STARTED })
        dispatch(fetchPopularMovies())
    }
}

export const refreshPopularMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_POPULAR_MOVIES_REFRESH })
        dispatch(fetchPopularMovies())
    }
}

export const paginatePopularMovies = () => {
    return (dispatch: any) => {
        dispatch({ type: types.FETCH_POPULAR_MOVIES_PAGINATE })
        dispatch(fetchPopularMovies())
    }
}



