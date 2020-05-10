// Libraries
import { createLogger } from 'redux-logger'

const config = {
  collapsed: (getState, action, logEntry) => !logEntry.error,
  colors: {
    action: () => '#ccac00',
    error: () => '#ff4040',
    nextState: () => '#00cc00',
    prevState: () => '#4c90b1',
    // title: () => '#4d8f7a',
    title: () => '#ce480a'
  },
  duration: true,
  predicate: (getState, action) => !action || !(/^@@petcheck\/NETWORK_STATUS\//.test(action.type) || /^@@redux-form/.test(action.type))
  // titleFormatter: ( action , time , took ) => {
  //  if( action ){
  //    return `[ PC ][ Enviroment: ${process.env.NODE_ENV} ] Redux action @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`;
  //  }
  // }
}

export default createLogger(config)
