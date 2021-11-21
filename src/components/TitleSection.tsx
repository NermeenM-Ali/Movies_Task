import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../assets/colors';
import fonts from '../assets/fonts';
import { moderateScale, verticalScale } from '../utils/Scaling'

interface TitleSectionProps {
    title: String,
}
const WIDTH = Dimensions.get('window').width;

const TitleSection = (props: TitleSectionProps) => {
    const { title } = props
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default React.memo(TitleSection)

const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(18),
        fontFamily: fonts.SEMI_BOLD_FONT,
        color: colors.BLACK_COLOR,
    },
    titleContainer: {
        width: WIDTH,
        marginBottom: verticalScale(5),
    }
})
