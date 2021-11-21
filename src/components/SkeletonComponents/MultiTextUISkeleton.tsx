import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../../assets/colors';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';

const MultiTextUISkeleton = () => {
    return (
        <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} highlightColor={colors.LIGHT_GRAY}>
            <View style={styles.textPlaceholder} />
            <View style={styles.textPlaceholder} />
            <View style={styles.textPlaceholder} />
            <View style={styles.textPlaceholder} />
            <View style={styles.textPlaceholder} />
        </SkeletonPlaceholder >
    )
}

export default React.memo(MultiTextUISkeleton)

const styles = StyleSheet.create({
    textPlaceholder: {
        width: scale(370),
        height: verticalScale(8),
        marginTop: verticalScale(3),
        marginHorizontal: scale(15),
        borderRadius: moderateScale(4),
    }
})
