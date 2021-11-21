import React from 'react'
import { StyleSheet, View } from 'react-native'
import { scale, verticalScale } from '../../utils/Scaling'
import DynamicSkeleton from './DynamicSkeleton'
import TextUISkeleton from './TextUISkeleton'

const MovieCreditsUiSkeleton = () => {
    return (
        <View>
            <TextUISkeleton />
            <View style={styles.creditsContainer}>
                <View style={styles.seperator}>
                    <DynamicSkeleton dynamicStyle={styles.creditsPlaceholder} />
                    <TextUISkeleton customWidth={scale(90)} />
                </View>
                <View style={styles.seperator}>
                    <DynamicSkeleton dynamicStyle={styles.creditsPlaceholder} />
                    <TextUISkeleton customWidth={scale(90)} />
                </View>
                <View style={styles.seperator}>
                    <DynamicSkeleton dynamicStyle={styles.creditsPlaceholder} />
                    <TextUISkeleton customWidth={scale(90)} />
                </View>
            </View>
        </View>
    )
}

export default MovieCreditsUiSkeleton

const styles = StyleSheet.create({

    creditsContainer: {
        width: '90%',
        flexDirection: 'row',
        marginTop: verticalScale(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    creditsPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
    },
    seperator: {
        marginLeft: scale(15)
    }
})
