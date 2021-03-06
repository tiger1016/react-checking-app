// Constants
import { ACTIONS_BASE } from '../globals'

const globalIdent = ACTIONS_BASE + 'WALKS/'

export const CANCEL_WALK_REJECTED = globalIdent + 'CANCEL_WALK_REJECTED'
export const CANCEL_WALK_REQUESTED = globalIdent + 'CANCEL_WALK_REQUESTED'
export const CANCEL_WALK_SUCCEEDED = globalIdent + 'CANCEL_WALK_SUCCEEDED'

export const CANCEL_WALKS_REJECTED = globalIdent + 'CANCEL_WALKS_REJECTED'
export const CANCEL_WALKS_REQUESTED = globalIdent + 'CANCEL_WALKS_REQUESTED'
export const CANCEL_WALKS_SUCCEEDED = globalIdent + 'CANCEL_WALKS_SUCCEEDED'

export const FETCH_WALKS_DOWNLOADING = globalIdent + 'FETCH_WALKS_DOWNLOADING'
export const FETCH_WALKS_REJECTED = globalIdent + 'FETCH_WALKS_REJECTED'
export const FETCH_WALKS_REQUESTED = globalIdent + 'FETCH_WALKS_REQUESTED'
export const FETCH_WALKS_SUCCEEDED = globalIdent + 'FETCH_WALKS_SUCCEEDED'
export const FETCH_UPDATED_WALKS_REQUESTED = globalIdent + 'FETCH_UPDATED_WALKS_REQUESTED'

export const UPDATE_WALK_REJECTED = globalIdent + 'UPDATE_WALK_REJECTED'
export const UPDATE_WALK_REQUESTED = globalIdent + 'UPDATE_WALK_REQUESTED'
export const UPDATE_WALK_SUCCEEDED = globalIdent + 'UPDATE_WALK_SUCCEEDED'

export const CREATE_WALK_REJECTED = globalIdent + 'CREATE_WALK_REJECTED'
export const CREATE_WALK_REQUESTED = globalIdent + 'CREATE_WALK_REQUESTED'
export const CREATE_WALK_SUCCEEDED = globalIdent + 'CREATE_WALK_SUCCEEDED'

export const FETCH_WALK_DETAIL_REJECTED = globalIdent + 'FETCH_WALK_DETAIL_REJECTED'
export const FETCH_WALK_DETAIL_REQUESTED = globalIdent + 'FETCH_WALK_DETAIL_REQUESTED'
export const FETCH_WALK_DETAIL_SUCCEEDED = globalIdent + 'FETCH_WALK_DETAIL_SUCCEEDED'

export const UPDATE_WALKS_FILTER = globalIdent + 'UPDATE_WALKS_FILTER'
