// Models
import BaseModel from '../../models/baseModel'

export default store => next => action => {
  const state = store.getState() // State before reducers
  BaseModel.updateState(state)
  const result = next(action)
  return result
}
