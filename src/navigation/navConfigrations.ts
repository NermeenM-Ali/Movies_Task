import { Options } from "react-native-navigation"
import colors from "../assets/colors"

const defaultConfigrations: Options = {
    layout: {
        orientation: ['portrait'],
        fitSystemWindows: true
    },
    animations: {
        push: { waitForRender: true },
        setRoot: { waitForRender: true },
        setStackRoot: { waitForRender: true },
        showModal: { waitForRender: true },
        dismissModal: { waitForRender: true },
        pop: { waitForRender: true },
    },
    statusBar: {
        visible: true,
        drawBehind: false,
        backgroundColor: colors.WHITE_COLOR,
        style: 'dark'
    },
    topBar: {
        height: 0,
        visible: false,
        drawBehind: true
    },
}

export { defaultConfigrations }