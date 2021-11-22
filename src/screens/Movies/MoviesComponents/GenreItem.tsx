import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors'
import { IGenre } from '../../../Interfaces/movies_interfaces'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface GenreItemProps {
    item: IGenre,
    index: number,
    forMovieCard?: boolean
}

const GenreItem = (props: GenreItemProps) => {
    const { index, item, forMovieCard = false } = props
    const { name } = item

    return (
        <View style={[styles.container, { marginLeft: (forMovieCard ? 0 : (index === 0 || index % 4 === 0) && !forMovieCard) ? scale(20) : scale(5) }]}>
            <Text style={styles.genreName}>{name}</Text>
        </View>
    )
}

export default React.memo(GenreItem)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(15),
        backgroundColor: colors.MID_GRAY,
        marginTop: verticalScale(7),
    },
    genreName: {
        fontSize: moderateScale(14),
        color: colors.WHITE_COLOR
    }
})
