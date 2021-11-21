import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import CreditsByMovieIDReducer from './reducers/CreditsByMovieIdReducer';
import GenresReducer from './reducers/GenresReducer';
import GetByIDReducer from './reducers/GetByIDReducer';
import InternetConnectionReducer from './reducers/InternetConnectionReducer';
import PopularMoviesReducer from './reducers/PopularMoviesReducer';
import TopRatedMoviesReducer from './reducers/TopRatedMoviesReducer';
import UpComingMoviesReducer from './reducers/UpComingMoviesReducer';

const reducers = combineReducers({
    UpComingMoviesReducer: UpComingMoviesReducer,
    PopularMoviesReducer: PopularMoviesReducer,
    TopRatedMoviesReducer: TopRatedMoviesReducer,
    GetByIDReducer: GetByIDReducer,
    GenresReducer: GenresReducer,
    CreditsByMovieIDReducer: CreditsByMovieIDReducer,
    InternetConnectionReducer: InternetConnectionReducer,
})

export type RootState = ReturnType<typeof reducers>

const store = createStore(reducers, applyMiddleware(thunk))

export { store }