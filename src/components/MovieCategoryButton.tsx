import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../assets/colors'
import fonts from '../assets/fonts'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'


interface MovieCategoryButtonProps {
    isSelected: boolean
    onPressed: () => void,
    buttonText: String
}

const MovieCategoryButton = (props: MovieCategoryButtonProps) => {
    let { buttonText, isSelected, onPressed } = props
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPressed} style={[styles.buttonContainer, { backgroundColor: isSelected ? colors.GREEN_COLOR : colors.MID_GRAY, elevation: isSelected ? 10 : 0, }]}>
            <Text style={[styles.btnText, { color: isSelected ? colors.WHITE_COLOR : colors.BLACK_COLOR }]}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(MovieCategoryButton)

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: scale(25),
        height: verticalScale(32),
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: moderateScale(14),
        fontFamily: fonts.MEDIUM_FONT
    }
})
