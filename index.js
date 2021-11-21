import 'react-native-gesture-handler'
import { LogBox } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { defaultConfigrations } from './src/navigation/navConfigrations'
import registerScreens from './src/navigation/MainNavigation';
import { AppRoot } from './src/navigation/Roots';

LogBox.ignoreAllLogs()
Navigation.setDefaultOptions(defaultConfigrations);
registerScreens()

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot(AppRoot)
});
