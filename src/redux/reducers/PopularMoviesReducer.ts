import * as types from '../Type';
const initialState = {
    popularMoviesData: [],
    pageLoading: true,
    pageError: false,
    pageRefresh: false,
    pagePaginate: false,
    moreData: true,
    pageIndex: 1,
    name: '',
}

const PopularMoviesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.FETCH_POPULAR_MOVIES_STARTED:
            return { ...initialState }
        case types.FETCH_POPULAR_MOVIES_SUCCESS:
            return {
                ...state, popularMoviesData: (state.pageRefresh || action.search) ? action.data : [...state.popularMoviesData, ...action.data], pageError: false, pageLoading: false, pageRefresh: false, pagePaginate: false,
                moreData: (state.popularMoviesData.length + action.data.length) >= action.records ? false : true
            }
        case types.FETCH_POPULAR_MOVIES_FAILED:
            return { ...state, pageError: true, pageLoading: false, pageRefresh: false, pagePaginate: false }
        case types.FETCH_POPULAR_MOVIES_REFRESH:
            return { ...state, pageRefresh: true, pageError: false, pageIndex: 1 }
        case types.FETCH_POPULAR_MOVIES_PAGINATE:
            return { ...state, pagePaginate: true, pageIndex: state.pageIndex + 1 }
        default:
            return state;
    }
}

export default PopularMoviesReducer