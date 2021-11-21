import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from 'react-redux'
import colors from '../../assets/colors'
import fonts from '../../assets/fonts'
import strings from '../../assets/strings'
import { AppStackScreens } from '../../navigation/ScreenEnums'
import { moderateScale, verticalScale } from '../../utils/Scaling'
import { checkConnectionStatus } from '../../redux/actions/InternetConnectionAction';

interface SplachScreenProps {
    componentId: string
}

const SplashScreen = (props: SplachScreenProps) => {
    const dispatch = useDispatch()
    let { componentId } = props
    useEffect(() => {
        setTimeout(() => {
            Navigation.push(componentId, {
                component: {
                    name: AppStackScreens.MOVIES_SCREEN
                }
            })
        }, 2000)
    }, [])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({ isConnected }) => dispatch(checkConnectionStatus(isConnected)));
        return () => { unsubscribe() }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.appNameText}>{strings.appName}</Text>
            <ActivityIndicator size='small' color={colors.GRAY_COLOR} style={styles.loader} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appNameText: {
        fontSize: moderateScale(50),
        color: colors.BLACK_COLOR,
        fontFamily: fonts.SEMI_BOLD_FONT
    },
    loader: {
        marginTop: verticalScale(40)
    }
})
