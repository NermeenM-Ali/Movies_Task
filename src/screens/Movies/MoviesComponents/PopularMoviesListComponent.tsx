import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import EmptyPage from '../../../components/EmptyPage'
import MovieCard from '../../../components/MovieCard'
import CardsUISkeleton from '../../../components/SkeletonComponents/CardsUISkeleton'
import Spinner from '../../../components/Spinner'
import { getPopularMovies, paginatePopularMovies, refreshPopularMovies } from '../../../redux/actions/PopularMoviesActions'
import { RootState } from '../../../redux/Configration'
import { scale, verticalScale } from '../../../utils/Scaling'


interface PopularMoviesListComponentProps {
    componentId: string
}

const WIDTH = Dimensions.get('window').width;
const selectorFunc = (state: RootState) => state.PopularMoviesReducer

const PopularMoviesListComponent = (props: PopularMoviesListComponentProps) => {
    const dispatch = useDispatch()
    const { componentId } = props
    const { moreData, pagePaginate, popularMoviesData, pageLoading, pageError, pageRefresh } = useSelector(selectorFunc, shallowEqual)

    useEffect(() => {
        dispatch(getPopularMovies())
    }, [dispatch])

    const applyPagination = useCallback(() => !pagePaginate && moreData && dispatch(paginatePopularMovies()), [pagePaginate, moreData])
    const applyRefresh = useCallback(() => !pageLoading && dispatch(refreshPopularMovies()), [pageRefresh])

    const renderFooter = () => {
        return pagePaginate ? <Spinner /> : <View />
    }

    return (
        <View style={styles.listContainer}>
            {
                (pageLoading && !popularMoviesData.length) ?
                    <CardsUISkeleton /> :
                    <FlatList
                        data={popularMoviesData}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <MovieCard item={item} componentId={componentId} />}
                        contentContainerStyle={{ paddingHorizontal: scale(7) }}
                        maxToRenderPerBatch={10}
                        refreshing={pageRefresh}
                        onRefresh={applyRefresh}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.1}
                        onEndReached={applyPagination}
                        ListEmptyComponent={() => pageError ? <EmptyPage onReload={getPopularMovies} /> : null}
                        ListFooterComponent={() => renderFooter()} />
            }
        </View>
    )
}

export default React.memo(PopularMoviesListComponent)

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: verticalScale(5),
        width: WIDTH,
    },

})
