import { AppStackScreens } from "./ScreenEnums";

export const AppRoot = {
    root: {
        stack: {
            id: 'AppStack',
            children: [
                { component: { name: AppStackScreens.SPLASH_SCREEN } },
            ]
        },
    }
}
