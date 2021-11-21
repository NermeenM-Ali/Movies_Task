import React, { useEffect } from 'react'
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../assets/colors'
import { IMovieCredits, IMovieDetails } from '../../Interfaces/movies_interfaces'
import { getMovieByID } from '../../redux/actions/GetByIDAction'
import { RootState } from '../../redux/Configration'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import { Navigation } from 'react-native-navigation'
import { IMG_PREFIX } from '../../services/end-pointes.type'
import fonts from '../../assets/fonts'
import strings from '../../assets/strings'
import GenreItem from './MoviesComponents/GenreItem'
import TitleSection from '../../components/TitleSection'
import CreditItem from './MoviesComponents/CreditItem'
import { getCreditsByMovieID } from '../../redux/actions/CreditsByMovieIdAction'
import MovieDetailsUISkeleton from '../../components/movieDetailsSkeletonUI'
import MovieCreditsUiSkeleton from '../../components/SkeletonComponents/MovieCreditsUiSkeleton'

const WIDTH = Dimensions.get('screen').width

interface MovieDetailsScreenProps {
    movieID: any
    componentId: string
}

const movieDetailsSelectorFunc = (state: RootState) => state.GetByIDReducer.moviesDetails
const movieDetailsLoadingSelectorFunc = (state: RootState) => state.GetByIDReducer.isMovieDetailsLoading

const movieCreditsSelectorFunc = (state: RootState) => state.CreditsByMovieIDReducer.moviesCredits
const movieCreditsLoadingSelectorFunc = (state: RootState) => state.CreditsByMovieIDReducer.isMovieCreditsLoading

const MovieDetailsScreen = (props: MovieDetailsScreenProps) => {
    const dispatch = useDispatch()
    const movieDetails: IMovieDetails = useSelector(movieDetailsSelectorFunc, shallowEqual)
    const isMovieDetailsLoading: boolean = useSelector(movieDetailsLoadingSelectorFunc)
    const movieCredits: IMovieCredits = useSelector(movieCreditsSelectorFunc, shallowEqual)
    const isMovieCreditsLoading: boolean = useSelector(movieCreditsLoadingSelectorFunc)
    const { movieID, componentId } = props
    const { poster_path, title, vote_average, overview, genres } = movieDetails

    const percentage = Math.ceil(Number(vote_average / 100) * 1000)

    useEffect(() => {
        dispatch(getMovieByID(movieID))
        dispatch(getCreditsByMovieID(movieID))
    }, [movieID])

    const handleBackNavigation = () => {
        Navigation.pop(componentId)
    }

    const renderBackArrowSection = () => {
        return (
            <View style={styles.arrowContainer}>
                <Pressable style={styles.backArrowButton} onPress={handleBackNavigation}>
                    <MaterialIcons name='arrow-back-ios' style={styles.arrowIcon} />
                </Pressable>
            </View>
        )
    }

    const renderMoviePosterSection = () => {
        return (
            <View style={styles.moviePosterDetailsSection}>
                <View style={styles.posterimageContainer}>
                    <Image source={poster_path ? { uri: IMG_PREFIX.concat(poster_path) } : require('../../assets/imgs/noImg.png')} style={styles.img} resizeMode='cover' />
                </View>
                <Text style={styles.movieTitle}>{title}</Text>
                <Text style={styles.percentageText}>{`${percentage}%`}</Text>
            </View>
        )
    }

    const renderOverviewSection = () => {
        return (
            <View style={styles.overviewSection}>
                <TitleSection title={strings.Overview} />
                <Text style={styles.overviewDescription}>{overview}</Text>
            </View>
        )
    }



    const renderCreditsSection = () => {
        return (
            <View style={styles.CreditSection}>
                <TitleSection title={strings.Credits} />
                <FlatList
                    horizontal
                    data={movieCredits?.cast}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item }) => <CreditItem item={item} />} />
            </View>
        )
    }

    const renderAllMovieDetailsSections = () => {
        return (
            <View style={styles.genresSection}>
                <FlatList
                    numColumns={4}
                    data={genres}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ flexGrow: 1 }}
                    ListHeaderComponentStyle={styles.handlePadding}
                    renderItem={({ item, index }) => <GenreItem item={item} index={index} />}
                    ListHeaderComponent={() => (<>
                        {renderBackArrowSection()}
                        {renderMoviePosterSection()}
                        {renderOverviewSection()}
                        <TitleSection title={strings.Genres} />
                    </>)}
                    ListFooterComponentStyle={styles.handlePadding}
                    ListFooterComponent={() => (
                        <>{isMovieCreditsLoading ? <MovieCreditsUiSkeleton /> : renderCreditsSection()}</>
                    )}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {isMovieDetailsLoading ?
                <MovieDetailsUISkeleton /> :
                renderAllMovieDetailsSections()
            }

        </View>
    )
}

export default MovieDetailsScreen

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    arrowContainer: {
        width: WIDTH,
        height: verticalScale(70),
        justifyContent: 'center'
    },
    backArrowButton: {
        width: scale(40),
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowIcon: {
        color: colors.BLACK_COLOR,
        fontSize: moderateScale(22)
    },
    moviePosterDetailsSection: {
        width: WIDTH,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    posterimageContainer: {
        height: verticalScale(200),
        width: scale(120),
        overflow: 'hidden',
        borderWidth: scale(0.5),
        borderColor: colors.SHADOW_COLOR,
        borderRadius: moderateScale(7),
        elevation: 0.3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(7),
    },
    movieTitle: {
        maxWidth: scale(350),
        textAlign: 'center',
        fontSize: moderateScale(24),
        fontFamily: fonts.BOLD_FONT,
        color: colors.BLACK_COLOR,
        marginTop: verticalScale(10)
    },
    percentageText: {
        fontSize: moderateScale(22),
        fontFamily: fonts.BOLD_FONT,
        color: colors.GREEN_COLOR,
        marginTop: verticalScale(5)
    },
    overviewSection: {
        width: '100%',
        marginTop: verticalScale(15)
    },
    overviewDescription: {
        fontSize: moderateScale(14),
        fontFamily: fonts.MEDIUM_FONT,
        color: colors.GRAY_COLOR,
        marginTop: verticalScale(5)
    },
    genresSection: {
        width: '100%',
        marginTop: verticalScale(15),
    },
    CreditSection: {
        width: '100%',
        paddingBottom: verticalScale(40),
        marginTop: verticalScale(15)
    },
    handlePadding: {
        paddingHorizontal: scale(20)
    }
})
