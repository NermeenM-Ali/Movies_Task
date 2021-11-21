import * as types from '../Type'

const initialState = {
    isInternetConnectionAvailable: false,
    connectionListener: null
}


const InternetConnectionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.CHECK_INTERNET_CONNECTION_STATUS:
            return { ...state, isInternetConnectionAvailable: action.payload, connectionListener: action.payloadListener }
        case types.CHANGE_CONNECTION_PROP:
            return { ...state, [action.prop]: action.value }
        default:
            return state
    }
}

export default InternetConnectionReducer