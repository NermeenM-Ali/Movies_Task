import * as types from '../Type';
const initialState = {
    genresList: [],
}

const GenresReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_GENRES_LIST:
            return { ...state, genresList: action.payload }
        default:
            return state;
    }
}

export default GenresReducer