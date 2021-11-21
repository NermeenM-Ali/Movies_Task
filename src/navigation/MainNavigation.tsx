import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from "react-redux"
import { store } from '../redux/Configration';
import SplashScreen from '../screens/Intro/SplashScreen';
import MovieDetailsScreen from '../screens/Movies/MovieDetailsScreen';
import MoviesScreen from '../screens/Movies/MoviesScreen';
import { AppStackScreens } from './ScreenEnums';


const reduxStoreWrapper = (MyComponent: any) => (props: any) => (
    <Provider store={store}>
        <MyComponent {...props} />
    </Provider>
)


const registerScreens = () => {
    Navigation.registerComponent(AppStackScreens.SPLASH_SCREEN, () => reduxStoreWrapper(SplashScreen))
    Navigation.registerComponent(AppStackScreens.MOVIES_SCREEN, () => reduxStoreWrapper(MoviesScreen))
    Navigation.registerComponent(AppStackScreens.MOVIE_DETAILS_SCREEN, () => reduxStoreWrapper(MovieDetailsScreen))
}

export default registerScreens