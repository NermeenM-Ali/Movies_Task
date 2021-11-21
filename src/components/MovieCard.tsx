import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useSelector } from 'react-redux'
import colors from '../assets/colors'
import fonts from '../assets/fonts'
import { IGenre, IMovie } from '../Interfaces/movies_interfaces'
import { AppStackScreens } from '../navigation/ScreenEnums'
import { RootState } from '../redux/Configration'
import GenreItem from '../screens/Movies/MoviesComponents/GenreItem'
import { IMG_PREFIX } from '../services/end-pointes.type'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface MovieCardProps {
    item: IMovie
    componentId: string
}
const generesSelectorFunc = (state: RootState) => state.GenresReducer.genresList
const MovieCard = (props: MovieCardProps) => {
    const genresList = useSelector(generesSelectorFunc)
    const [movieGenresList, setMovieGenresList] = useState<IGenre[]>([])
    const { componentId, item } = props
    const { poster_path, title, release_date, vote_average, id, genre_ids } = item
    const percentage = Math.ceil(Number(vote_average / 100) * 1000)

    useEffect(() => {
        let list: IGenre[] = [];
        genre_ids.map((genreId: number) => {
            genresList.map((genreItem: IGenre) => {
                if (genreItem.id === genreId) {
                    list.push(genreItem)
                }
            })
        })
        setMovieGenresList(list)
    }, [])

    const renderImageSection = () => {
        return (
            <View style={styles.imageContainer}>
                <Image source={poster_path ? { uri: IMG_PREFIX.concat(poster_path) } : require('../assets/imgs/noImg.png')} style={styles.img} resizeMode='cover' />
            </View>
        )
    }

    const renderMovieInfoSection = () => {
        return (
            <View style={styles.movieInfoContainer}>
                <Text style={styles.movieTitle}>{title}</Text>
                <Text style={styles.releaseDate}>{moment(release_date).format('LL')}</Text>
                <FlatList
                    numColumns={2}
                    data={movieGenresList}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => <GenreItem item={item} index={index} forMovieCard={true} />} />
            </View>
        )
    }

    const handleNavigation = () => {
        Navigation.push(componentId, { component: { name: AppStackScreens.MOVIE_DETAILS_SCREEN, passProps: { movieID: id } } })
    }

    const renderAvarageVoteSection = () => {
        return (
            <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>{`${percentage}%`}</Text>
            </View>
        )
    }
    return (
        <TouchableOpacity activeOpacity={1} onPress={handleNavigation} style={styles.container}>
            {renderImageSection()}
            {renderMovieInfoSection()}
            {renderAvarageVoteSection()}
        </TouchableOpacity>
    )
}

export default React.memo(MovieCard)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: scale(380),
        marginTop: verticalScale(10),
        paddingVertical: verticalScale(10),
        backgroundColor: colors.WHITE_COLOR,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius: moderateScale(7),
        paddingHorizontal: scale(10)
    },
    imageContainer: {
        height: verticalScale(170),
        width: scale(100),
        overflow: 'hidden',
        borderWidth: scale(0.5),
        borderColor: colors.SHADOW_COLOR,
        borderRadius: moderateScale(7),
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(7),
    },
    movieInfoContainer: {
        marginHorizontal: scale(5),
    },
    movieTitle: {
        maxWidth: scale(250),
        fontSize: moderateScale(16),
        fontFamily: fonts.BOLD_FONT,
        color: colors.BLACK_COLOR
    },
    releaseDate: {
        fontSize: moderateScale(14),
        fontFamily: fonts.MEDIUM_FONT,
        color: colors.GRAY_COLOR,
        marginVertical: verticalScale(8)
    },
    percentageContainer: {
        position: 'absolute',
        bottom: verticalScale(-5),
        right: scale(7),
    },
    percentageText: {
        fontSize: moderateScale(16),
        fontFamily: fonts.BOLD_FONT,
        color: colors.GREEN_COLOR,
        marginVertical: verticalScale(10)
    }
})
