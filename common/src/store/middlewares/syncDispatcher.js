// Constants
import { SYNC_SUCCEEDED } from '../../constants/app/Actions'
import _ from 'lodash'

export default store => next => action => {
  if (action.type === SYNC_SUCCEEDED) {
    const syncEvents = action.payload
    if (syncEvents && _.find(syncEvents, ['type', 'walk'])) { // TODO: Optimize this logic for sync_event of walks series
      action.cb({ event_type: 'walks_update' }, store.dispatch)
    }
    syncEvents.forEach(event => action.cb(event, store.dispatch))
  }
  next(action)
}
