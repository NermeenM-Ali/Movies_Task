import * as types from '../Type';
const initialState = {
    moviesCredits: {},
    isMovieCreditsLoading: false,
    isMovieCreditsError: false
}

const CreditsByMovieIDReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_MOVIE_CREDITS_BY_ID_SUCCESS:
            return { ...state, moviesCredits: action.payload, isMovieCreditsLoading: false }
        case types.GET_MOVIE_CREDITS_BY_ID_FAILED:
            return { ...state, isMovieCreditsLoading: false, isMovieCreditsError: true }
        case types.CHANGE_DETAILS_PROPS:
            return { ...state, [action.prop]: action.value }
        default:
            return state;
    }
}

export default CreditsByMovieIDReducer