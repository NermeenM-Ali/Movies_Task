import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../../assets/colors';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';

const DividerUISkeleton = () => {
    return (
        <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} highlightColor={colors.LIGHT_GRAY}>
            <View style={styles.textPlaceholder} />
        </SkeletonPlaceholder >
    )
}

export default React.memo(DividerUISkeleton)

const styles = StyleSheet.create({
    textPlaceholder: {
        width: scale(350),
        height: verticalScale(1.5),
        marginVertical: verticalScale(5),
        marginHorizontal: scale(13),
        borderRadius: moderateScale(4),
        alignSelf: 'center'
    }
})
