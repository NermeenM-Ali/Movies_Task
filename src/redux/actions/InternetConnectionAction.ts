import * as types from '../Type'

export const checkConnectionStatus = (status: boolean | null) => {
    return (dispatch: any) => {
        dispatch({ type: types.CHECK_INTERNET_CONNECTION_STATUS, payload: status })
    }
}

export const changeConnectionProps = (prop: any, value: any) => {
    return (dispatch: any) => {
        dispatch({
            type: types.CHANGE_CONNECTION_PROP,
            prop,
            value
        })
    }

}