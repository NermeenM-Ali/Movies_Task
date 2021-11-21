import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors'
import fonts from '../../../assets/fonts'
import { ICast } from '../../../Interfaces/movies_interfaces'
import { IMG_PREFIX } from '../../../services/end-pointes.type'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface CreditItemProps {
    item: ICast,
}

const CreditItem = (props: CreditItemProps) => {
    const { name, profile_path } = props.item
    return (
        <View style={styles.container}>
            <Image source={profile_path ? { uri: IMG_PREFIX.concat(profile_path) } : require('../../../assets/imgs/noImg.png')} style={styles.img} resizeMode='cover' />
            <Text numberOfLines={1} style={styles.creditName}>{name}</Text>
        </View>
    )
}

export default React.memo(CreditItem)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(5),
        marginTop: verticalScale(7),
        justifyContent: 'center',
        alignItems: 'center'
    },
    creditName: {
        fontSize: moderateScale(14),
        color: colors.BLACK_COLOR,
        fontFamily: fonts.MEDIUM_FONT
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})
