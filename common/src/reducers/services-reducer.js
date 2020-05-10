// Constants
import {
  CREATE_SERVICE_REQUESTED,
  CREATE_SERVICE_SUCCEDED,
  CREATE_SERVICE_REJECTED,
  FETCH_FULL_SERVICES_REJECTED,
  FETCH_FULL_SERVICES_REQUESTED,
  FETCH_FULL_SERVICES_SUCCEDED,
  FETCH_SERVICES_REJECTED,
  FETCH_SERVICES_REQUESTED,
  FETCH_SERVICES_SUCCEDED,
  FETCH_SERVICE_REJECTED,
  FETCH_SERVICE_REQUESTED,
  FETCH_SERVICE_SUCCEDED,
  PUSH_NEW_SERVICE_LOCALLY,
  REMOVE_NEW_LOCAL_SERVICES,
  REMOVE_UPDATED_SERVICE,
  UPDATE_SERVICE_REJECTED,
  UPDATE_SERVICE_REQUESTED,
  UPDATE_SERVICE_SUCCEDED,
  SET_SERVICE_EDITMODE_LOCALLY,
  SORT_SERVICE_LOCALLY,
  ARCHIVE_SERVICE_SUCCEDED
} from '../constants/services/Actions'

// Models
import { servicesModel } from '../models'

// Initial state
import initialstate from '../initialstate/services-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case CREATE_SERVICE_REQUESTED:
    case FETCH_FULL_SERVICES_REQUESTED:
    case FETCH_SERVICES_REQUESTED:
    case FETCH_SERVICE_REQUESTED:
    case UPDATE_SERVICE_REQUESTED:
      return servicesModel.loadingWithMessage(state, { loadingMessage: action.payload })

    /*
    Rejected
    */
    case CREATE_SERVICE_REJECTED:
    case FETCH_FULL_SERVICES_REJECTED:
    case FETCH_SERVICES_REJECTED:
    case FETCH_SERVICE_REJECTED:
    case UPDATE_SERVICE_REJECTED:
      return servicesModel.serviceRejected(state, { error: action.payload })

    /*
    Succeded
    */
    case CREATE_SERVICE_SUCCEDED:
      return servicesModel.createService(state, { newService: action.payload.newService, tempService: action.payload.tempService })
    case FETCH_FULL_SERVICES_SUCCEDED:
    case FETCH_SERVICES_SUCCEDED:
      return servicesModel.updateServices(state, { services: action.payload })
    case FETCH_SERVICE_SUCCEDED:
    case UPDATE_SERVICE_SUCCEDED:
      return servicesModel.updateService(state, { service: action.payload.service, oldServiceId: action.oldServiceId })
    case ARCHIVE_SERVICE_SUCCEDED:
      return servicesModel.archiveService(state, { serviceId: action.payload })
    /*
    Other
    */
    case PUSH_NEW_SERVICE_LOCALLY:
      return servicesModel.newTempService(state, { service: action.payload })
    case REMOVE_NEW_LOCAL_SERVICES:
      return servicesModel.removeTempServices(state)
    case REMOVE_UPDATED_SERVICE:
      return servicesModel.removeServices(state, { service: action.payload })
    case SET_SERVICE_EDITMODE_LOCALLY:
      return servicesModel.editService(state, { service: action.payload })
    case SORT_SERVICE_LOCALLY:
      return servicesModel.sortService(state, { sortBy: action.payload.sortBy })
  }
  return state
}
