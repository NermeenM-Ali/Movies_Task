import React from 'react'
import { ActivityIndicator } from 'react-native'
import colors from '../assets/colors'
import { verticalScale } from '../utils/Scaling'

const Spinner = () => (
    <ActivityIndicator color={colors.BLACK_COLOR} size='small' style={{ marginVertical: verticalScale(20) }} />
)


export default React.memo(Spinner)

