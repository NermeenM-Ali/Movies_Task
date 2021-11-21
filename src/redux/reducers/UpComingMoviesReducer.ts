
import * as types from '../Type';
const initialState = {
    upComingMovies: [],
    upComingMoviesImgs: [],
    posterMovies: [],
    pageLoading: true,
    pageError: false,
    pageRefresh: false,
    pagePaginate: false,
    moreData: true,
    pageIndex: 1,
    name: '',
    isUpComingMoviesImgsError: false
}

const UpComingMoviesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.FETCH_UP_COMING_MOVIES_STARTED:
            return { ...initialState }
        case types.FETCH_UP_COMING_MOVIES_SUCCESS:
            return {
                ...state,
                upComingMovies: (state.pageRefresh || action.search) ? action.data : [...state.upComingMovies, ...action.data], pageError: false, pageLoading: false, pageRefresh: false, pagePaginate: false,
                moreData: (state.upComingMovies.length + action.data.length) >= action.records ? false : true
            }
        case types.FETCH_UP_COMING_MOVIES_FAILED:
            return { ...state, pageError: true, pageLoading: false, pageRefresh: false, pagePaginate: false }
        case types.FETCH_UP_COMING_MOVIES_REFRESH:
            return { ...state, pageRefresh: true, pageError: false, pageIndex: 1 }
        case types.FETCH_UP_COMING_MOVIES_PAGINATE:
            return { ...state, pagePaginate: true, pageIndex: state.pageIndex + 1 }
        default:
            return state;
    }
}

export default UpComingMoviesReducer