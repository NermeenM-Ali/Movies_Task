import { CreditsService } from '../../services/api/Credits.service';
import * as types from '../Type'

export const getCreditsByMovieID = (movieID: number) => {
    return async (dispatch: any) => {
        const CreditsServiceApi = new CreditsService();
        dispatch(changeDetailsProp('isMovieCreditsLoading', true))
        try {
            CreditsServiceApi.GetCreditsByMovieID(movieID).then((response: any) => {
                if (response) {
                    dispatch({
                        type: types.GET_MOVIE_CREDITS_BY_ID_SUCCESS,
                        payload: response
                    })
                } else {
                    dispatch({ type: types.GET_MOVIE_CREDITS_BY_ID_FAILED })
                }

            })
        } catch (e) {
            dispatch({ type: types.GET_MOVIE_CREDITS_BY_ID_FAILED })
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

export const clearCreditsDetails = () => {
    return (dispatch: any) => {
        dispatch(changeDetailsProp('moviesCredits', {}))
    }
}
