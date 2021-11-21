import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import EmptyPage from '../../../components/EmptyPage'
import MovieCard from '../../../components/MovieCard'
import CardsUISkeleton from '../../../components/SkeletonComponents/CardsUISkeleton'
import Spinner from '../../../components/Spinner'
import { getUpComingMovies, paginateUpComingMovies, refreshUpComingMovies } from '../../../redux/actions/UpComingMoviesAction'
import { RootState } from '../../../redux/Configration'
import { scale, verticalScale } from '../../../utils/Scaling'

interface UpComingMoviesCategoryListProps {
    componentId: string
}

const WIDTH = Dimensions.get('window').width;

const selectorFunc = (state: RootState) => state.UpComingMoviesReducer

const UpComingMoviesCategoryList = (props: UpComingMoviesCategoryListProps) => {
    const dispatch = useDispatch()
    const { componentId } = props
    const { moreData, pagePaginate, upComingMovies, pageLoading, pageRefresh, pageError } = useSelector(selectorFunc, shallowEqual)

    useEffect(() => {
        dispatch(getUpComingMovies())
    }, [dispatch])

    const applyPagination = useCallback(() => !pagePaginate && moreData && dispatch(paginateUpComingMovies()), [pagePaginate, moreData])
    const applyRefresh = useCallback(() => !pageLoading && dispatch(refreshUpComingMovies()), [pageRefresh])

    const renderFooter = () => {
        return pagePaginate ? <Spinner /> : <View />
    }


    return (
        <View style={styles.listContainer}>
            {
                (pageLoading && !upComingMovies.length) ?
                    <CardsUISkeleton /> :
                    <FlatList
                        data={upComingMovies}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <MovieCard item={item} componentId={componentId} />}
                        contentContainerStyle={{ paddingHorizontal: scale(7) }}
                        maxToRenderPerBatch={10}
                        refreshing={pageRefresh}
                        onRefresh={applyRefresh}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.1}
                        onEndReached={applyPagination}
                        ListEmptyComponent={() => pageError ? <EmptyPage onReload={getUpComingMovies} /> : null}
                        ListFooterComponent={() => renderFooter()}
                    />
            }
        </View>
    )
}

export default React.memo(UpComingMoviesCategoryList)

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: verticalScale(5),
        width: WIDTH,
    },

})
