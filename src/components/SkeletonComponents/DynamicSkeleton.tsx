import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../../assets/colors';

const DynamicSkeleton = ({ dynamicStyle }: any) => {
    return (
        <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} highlightColor={colors.LIGHT_GRAY}>
            <View style={dynamicStyle} />
        </SkeletonPlaceholder >
    )
}

export default React.memo(DynamicSkeleton)

