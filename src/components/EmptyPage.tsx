import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from '../utils/Scaling';
import colors from '../assets/colors';

import ReloadButton from './ReloadButton';
import strings from '../assets/strings';
import fonts from '../assets/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface EmptyPageProps {
    onReload: () => void
}

const EmptyPage = (props: EmptyPageProps) => {
    const { onReload } = props

    return (
        <View style={styles.container} >
            <MaterialIcons name='error-outline' size={150} color={colors.LIGHT_GRAY} />
            <Text style={styles.emptyTxt}> {strings.errorMessage} </Text>
            <ReloadButton onPress={onReload} />
        </View>
    )
}

export default React.memo(EmptyPage)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(120)
    },
    emptyTxt: {
        fontFamily: fonts.SEMI_BOLD_FONT,
        paddingHorizontal: scale(10),
        color: '#CCD1D1',
        fontSize: moderateScale(18),
        marginVertical: verticalScale(30)
    }

})