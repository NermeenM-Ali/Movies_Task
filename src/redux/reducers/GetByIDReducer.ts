import * as types from '../Type';
const initialState = {
    moviesDetails: {},
    isMovieDetailsLoading: false,
    isMovieDetailsError: false
}

const GetByIDReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_MOVIE_BY_ID_SUCCESS:
            return { ...state, moviesDetails: action.payload, isMovieDetailsLoading: false }
        case types.GET_MOVIE_BY_ID_FAIL:
            return { ...state, isMovieDetailsLoading: false, isMovieDetailsError: true }
        case types.CHANGE_DETAILS_PROPS:
            return { ...state, [action.prop]: action.value }
        default:
            return state;
    }
}

export default GetByIDReducer