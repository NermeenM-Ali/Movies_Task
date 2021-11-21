import React, { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import NetInfo from "@react-native-community/netinfo";
import { useDispatch } from 'react-redux'
import colors from '../../assets/colors'
import fonts from '../../assets/fonts'
import strings from '../../assets/strings'
import { AppStackScreens } from '../../navigation/ScreenEnums'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
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
            <Image source={require('../../assets/imgs/Logo.png')} style={styles.logoImg} resizeMode='contain' />
            <Text style={styles.appNameText}>{strings.appName}</Text>
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
        fontSize: moderateScale(45),
        color: colors.BLACK_COLOR,
        fontFamily: fonts.SEMI_BOLD_FONT,
        marginTop: verticalScale(25),
    },
    logoImg: {
        width: scale(400),
        height: verticalScale(200),
    }
})
