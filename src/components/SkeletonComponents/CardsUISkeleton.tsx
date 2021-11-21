import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../../assets/colors';
import { scale, verticalScale } from '../../utils/Scaling';

const CardsUISkeleton = () => {
    return (
        <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} highlightColor={colors.LIGHT_GRAY}>
            <View style={styles.container}>
                <View style={styles.cardPlaceholder} />
                <View style={styles.cardPlaceholder} />
                <View style={styles.cardPlaceholder} />
                <View style={styles.cardPlaceholder} />
            </View>
        </SkeletonPlaceholder >
    )
}

export default React.memo(CardsUISkeleton)

const styles = StyleSheet.create({
    container: {
        width: scale(380),
        alignSelf: 'center'
    },
    cardPlaceholder: {
        width: scale(380),
        height: verticalScale(180),
        marginTop: verticalScale(10),
        paddingVertical: verticalScale(10),
        alignItems: 'center',
        borderRadius: scale(7),
        overflow: 'hidden'
    }
})
