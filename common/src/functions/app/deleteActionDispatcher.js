// Action Types
import {
  DELETE_CUSTOMER_SUCCEEDED,
  DELETE_CUSTOMER_PET_SUCCEEDED
} from '../../constants/customers/Actions'

import {
  ARCHIVE_PETS_OF_CUSTOMER_SUCCEEDED,
  DELETE_PET_SUCCEDED
} from '../../constants/pets/Actions'

import {
  DELETE_INVOICES_SUCCEDED
} from '../../constants/invoices/Actions'

import {
  REMOVE_UPDATED_SERVICE
} from '../../constants/services/Actions'

// Constants
import {
  REMOVE_UPDATED_ADDON
} from '../../constants/addons/Actions'

// Constants
import {
  CANCEL_WALK_SUCCEEDED
} from '../../constants/walks/Actions'

// Actions
import fetchAlerts from '../../actions/alerts/fetchAlerts'

export default (reducer, id, dispatch) => {
  switch (reducer) {
    case 'addons':
      dispatch({ type: REMOVE_UPDATED_ADDON, payload: id })
      break
    case 'customer':
      dispatch({ type: DELETE_CUSTOMER_SUCCEEDED, payload: { user_id: id } })
      dispatch({ type: ARCHIVE_PETS_OF_CUSTOMER_SUCCEEDED, payload: { customer_id: id, archive: 1 } })
      break
    case 'invoice':
      dispatch({ type: DELETE_INVOICES_SUCCEDED, payload: [id] })
      break
    case 'pet':
      dispatch({ type: DELETE_CUSTOMER_PET_SUCCEEDED, payload: { id } })
      dispatch({ type: DELETE_PET_SUCCEDED, payload: { id } })
      break
    case 'services':
      dispatch({ type: REMOVE_UPDATED_SERVICE, payload: id })
      break
    case 'settings':
      break
    case 'walk':
      dispatch({ type: CANCEL_WALK_SUCCEEDED, payload: { walkId: id } })
      break
    case 'alerts':
      dispatch(fetchAlerts())
      break
  }
}
