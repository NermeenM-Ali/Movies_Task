import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from '../assets/colors'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'
import DynamicSkeleton from './SkeletonComponents/DynamicSkeleton'
import MultiTextUISkeleton from './SkeletonComponents/MultiTextUISkeleton'
import PosterUISkeleton from './SkeletonComponents/PosterUISkeleton'
import TextUISkeleton from './SkeletonComponents/TextUISkeleton'


const MovieDetailsUISkeleton = () => {
    return (
        <View style={styles.container}>
            <PosterUISkeleton />
            <View style={styles.titleContainer}>
                <TextUISkeleton />
                <TextUISkeleton customWidth={scale(50)} />
            </View>

            <TextUISkeleton />
            <View>
                <MultiTextUISkeleton />
                <MultiTextUISkeleton />
            </View>

            <TextUISkeleton />
            <View style={styles.genresContainer}>
                <DynamicSkeleton dynamicStyle={styles.genrePlaceholder} />
                <DynamicSkeleton dynamicStyle={styles.genrePlaceholder} />
                <DynamicSkeleton dynamicStyle={styles.genrePlaceholder} />
                <DynamicSkeleton dynamicStyle={styles.genrePlaceholder} />
            </View>

        </View>
    )
}

export default MovieDetailsUISkeleton

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(7)
    },
    genresContainer: {
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: scale(20),
        marginTop: verticalScale(15)
    },
    genrePlaceholder: {
        width: scale(140),
        height: verticalScale(35),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(25),
        backgroundColor: colors.GRAY_COLOR,
        marginTop: verticalScale(7),
    },


})

