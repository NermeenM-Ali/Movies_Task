import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import EmptyPage from '../../../components/EmptyPage'
import MovieCard from '../../../components/MovieCard'
import CardsUISkeleton from '../../../components/SkeletonComponents/CardsUISkeleton'
import Spinner from '../../../components/Spinner'
import { getTopRatedMovies, paginateTopRatedMovies, refreshTopRatedMovies } from '../../../redux/actions/TopRatedMoviesAction'
import { RootState } from '../../../redux/Configration'
import { scale, verticalScale } from '../../../utils/Scaling'


interface TopRatedMoviesListComponentProps {
    componentId: string
}

const WIDTH = Dimensions.get('screen').width;

const selectorFunc = (state: RootState) => state.TopRatedMoviesReducer

const TopRatedMoviesListComponent = (props: TopRatedMoviesListComponentProps) => {
    const dispatch = useDispatch()
    const { componentId } = props
    const { moreData, pagePaginate, topRatedMoviesData, pageLoading, pageError, pageRefresh } = useSelector(selectorFunc, shallowEqual)

    useEffect(() => {
        dispatch(getTopRatedMovies())
    }, [dispatch])

    const applyPagination = () => !pagePaginate && moreData && dispatch(paginateTopRatedMovies())
    const applyRefresh = () => !pageLoading && dispatch(refreshTopRatedMovies())

    const renderFooter = () => pagePaginate ? <Spinner /> : null
    const renderEmptyPage = () => pageError ? <EmptyPage onReload={getTopRatedMovies} /> : null

    return (
        <View style={styles.listContainer}>
            {
                (pageLoading && !topRatedMoviesData.length) ?
                    <CardsUISkeleton /> :
                    <FlatList
                        data={topRatedMoviesData}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <MovieCard item={item} componentId={componentId} />}
                        contentContainerStyle={{ paddingHorizontal: scale(7) }}
                        initialNumToRender={20}
                        bounces={false}
                        legacyImplementation={false}
                        refreshing={pageRefresh}
                        onRefresh={applyRefresh}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.1}
                        onEndReached={applyPagination}
                        ListEmptyComponent={renderEmptyPage}
                        ListFooterComponent={renderFooter} />
            }
        </View>
    )
}

export default React.memo(TopRatedMoviesListComponent)

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: verticalScale(5),
        width: WIDTH,
    },

})
