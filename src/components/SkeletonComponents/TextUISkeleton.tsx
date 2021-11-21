import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../../assets/colors';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';

const TextUISkeleton = ({ customWidth = scale(180) }: any) => {
    return (
        <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} highlightColor={colors.LIGHT_GRAY}>
            <View style={[styles.textPlaceholder, { width: customWidth }]} />
        </SkeletonPlaceholder >
    )
}

export default React.memo(TextUISkeleton)

const styles = StyleSheet.create({
    textPlaceholder: {
        height: verticalScale(15),
        marginVertical: verticalScale(20),
        marginHorizontal: scale(13),
        borderRadius: moderateScale(4)
    }
})
