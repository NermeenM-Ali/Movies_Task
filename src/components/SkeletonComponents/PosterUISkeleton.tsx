import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../../assets/colors';
import { styles } from '../../screens/Movies/MovieDetailsScreen';
import { verticalScale } from '../../utils/Scaling';

const PosterUISkeleton = () => {
    return (
        <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} highlightColor={colors.LIGHT_GRAY}>
            <View style={styles.moviePosterDetailsSection}>
                <View style={{ height: verticalScale(70) }} />
                <View style={styles.posterimageContainer} />
            </View>
        </SkeletonPlaceholder>
    )
}

export default React.memo(PosterUISkeleton)

