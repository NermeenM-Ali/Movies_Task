import React, { useCallback, useEffect, useState, } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import colors from '../../assets/colors'
import fonts from '../../assets/fonts'
import strings from '../../assets/strings'
import MovieCategoryButton from '../../components/MovieCategoryButton'
import { getGenresList } from '../../redux/actions/GenresAction'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import PopularMoviesListComponent from './MoviesComponents/PopularMoviesListComponent'
import TopRatedMoviesListComponent from './MoviesComponents/TopRatedMoviesListComponent'
import UpComingMoviesCategoryList from './MoviesComponents/UpComingMoviesCategoryList'

const WIDTH = Dimensions.get('screen').width

interface MoviesScreenProps {
    componentId: string
}
const MoviesScreen = (props: MoviesScreenProps) => {
    const dispatch = useDispatch()
    const [tabsObj, setTabsObj] = useState({
        isUpcomingTabSelected: true,
        isPopularTabSelected: false,
        isTopRatedTabSelected: false
    })
    const { componentId } = props
    const { isPopularTabSelected, isTopRatedTabSelected, isUpcomingTabSelected } = tabsObj

    useEffect(() => {
        dispatch(getGenresList())
    }, [])

    const renderHeaderSection = () => {
        return (
            <View style={styles.headerSection}>
                <Text style={styles.headerText}>{strings.Movies}</Text>
            </View>
        )
    }

    const handleUpComingTab = useCallback(() => {
        setTabsObj({
            isUpcomingTabSelected: true,
            isPopularTabSelected: false,
            isTopRatedTabSelected: false
        })
    }, [])

    const handlePopularTab = useCallback(() => {
        setTabsObj({
            isUpcomingTabSelected: false,
            isPopularTabSelected: true,
            isTopRatedTabSelected: false
        })
    }, [])

    const handleTopRatedTab = useCallback(() => {
        setTabsObj({
            isUpcomingTabSelected: false,
            isPopularTabSelected: false,
            isTopRatedTabSelected: true
        })
    }, [])

    const renderMovieCategoriesButtons = () => {
        return (
            <View style={styles.categoryButtonsSection}>
                <MovieCategoryButton
                    buttonText={strings.UpComingMovies}
                    isSelected={isUpcomingTabSelected}
                    onPressed={handleUpComingTab} />

                <MovieCategoryButton
                    buttonText={strings.PopularMovies}
                    isSelected={isPopularTabSelected}
                    onPressed={handlePopularTab} />

                <MovieCategoryButton
                    buttonText={strings.TopRatedMovies}
                    isSelected={isTopRatedTabSelected}
                    onPressed={handleTopRatedTab} />
            </View>
        )
    }

    const renderMovieLists = () => {
        return (
            <View style={styles.container}>
                {
                    isUpcomingTabSelected && !isPopularTabSelected && !isTopRatedTabSelected ?
                        <UpComingMoviesCategoryList componentId={componentId} /> :
                        isPopularTabSelected && !isUpcomingTabSelected && !isTopRatedTabSelected ?
                            <PopularMoviesListComponent componentId={componentId} /> :
                            <TopRatedMoviesListComponent componentId={componentId} />
                }
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeaderSection()}
            {renderMovieCategoriesButtons()}
            {renderMovieLists()}
        </View>
    )
}

export default MoviesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    headerSection: {
        width: WIDTH,
        paddingTop: verticalScale(20),
        paddingHorizontal: scale(25),
        justifyContent: 'center'
    },
    headerText: {
        fontSize: moderateScale(30),
        fontFamily: fonts.BOLD_FONT,
        color: colors.BLACK_COLOR
    },
    categoryButtonsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: scale(20),
        paddingVertical: verticalScale(18),
    }
})
