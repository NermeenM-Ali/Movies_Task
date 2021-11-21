import * as types from '../Type';
const initialState = {
    topRatedMoviesData: [],
    pageLoading: true,
    pageError: false,
    pageRefresh: false,
    pagePaginate: false,
    moreData: true,
    pageIndex: 1,
    name: '',
}

const TopRatedMoviesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.FETCH_TOP_RATED_MOVIES_STARTED:
            return { ...initialState }
        case types.FETCH_TOP_RATED_MOVIES_SUCCESS:
            return {
                ...state, topRatedMoviesData: (state.pageRefresh || action.search) ? action.data : [...state.topRatedMoviesData, ...action.data], pageError: false, pageLoading: false, pageRefresh: false, pagePaginate: false,
                moreData: (state.topRatedMoviesData.length + action.data.length) >= action.records ? false : true
            }
        case types.FETCH_TOP_RATED_MOVIES_FAILED:
            return { ...state, pageError: true, pageLoading: false, pageRefresh: false, pagePaginate: false }
        case types.FETCH_TOP_RATED_MOVIES_REFRESH:
            return { ...state, pageRefresh: true, pageError: false, pageIndex: 1 }
        case types.FETCH_TOP_RATED_MOVIES_PAGINATE:
            return { ...state, pagePaginate: true, pageIndex: state.pageIndex + 1 }
        default:
            return state;
    }
}

export default TopRatedMoviesReducer