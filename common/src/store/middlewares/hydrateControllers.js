// Controllers
import BaseController from '../../controllers/baseController'

/**
 * Custom middleware that gives controllers a reference to the current state of store
 */
export default store => next => action => {
  const result = next(action)
  const state = store.getState() // State after reducers
  BaseController.updateState(state)
  return result
}
