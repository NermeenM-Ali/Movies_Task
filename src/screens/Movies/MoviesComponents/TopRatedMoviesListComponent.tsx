import React, { useCallback, useEffect } from 'react'
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

const WIDTH = Dimensions.get('window').width;
const selectorFunc = (state: RootState) => state.TopRatedMoviesReducer

const TopRatedMoviesListComponent = (props: TopRatedMoviesListComponentProps) => {
    const dispatch = useDispatch()
    const { componentId } = props
    const { moreData, pagePaginate, topRatedMoviesData, pageLoading, pageError, pageRefresh } = useSelector(selectorFunc, shallowEqual)

    useEffect(() => {
        dispatch(getTopRatedMovies())
    }, [dispatch])

    const applyPagination = useCallback(() => !pagePaginate && moreData && dispatch(paginateTopRatedMovies()), [pagePaginate, moreData])
    const applyRefresh = useCallback(() => !pageLoading && dispatch(refreshTopRatedMovies()), [pageRefresh])

    const renderFooter = () => {
        return pagePaginate ? <Spinner /> : <View />
    }

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
                        maxToRenderPerBatch={10}
                        refreshing={pageRefresh}
                        onRefresh={applyRefresh}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.1}
                        onEndReached={applyPagination}
                        ListEmptyComponent={() => pageError ? <EmptyPage onReload={getTopRatedMovies} /> : null}
                        ListFooterComponent={() => renderFooter()} />
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
