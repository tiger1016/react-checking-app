// Libraries
import { createTransform } from 'redux-persist'

export default createTransform(
  (inboundState, key) => {
    if (inboundState.petcheckReducer) {
      return {
        ...inboundState,
        error: null,
        errorCode: 0,
        errorMessage: null,
        loading: false,
        loadingCode: 0,
        loadingMessage: null
      }
    }
    return inboundState
  },
  (outboundState, key) => {
    return outboundState
  }
  // { whitelist: ['someReducer'] }
)
