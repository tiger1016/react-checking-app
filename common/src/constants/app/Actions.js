// Constants
import { ACTIONS_BASE } from '../globals'

const globalIdent = ACTIONS_BASE + 'APP/'

export const CLOSE_SIDEBAR = globalIdent + 'CLOSE_SIDEBAR'
export const OPEN_SIDEBAR = globalIdent + 'OPEN_SIDEBAR'
export const TOGGLE_MODAL = globalIdent + 'TOGGLE_MODAL'
export const TOGGLE_ALERT = globalIdent + 'TOGGLE_ALERT'
export const TOGGLE_QR_SCANNER = globalIdent + 'TOGGLE_QR_SCANNER'
export const TOGGLE_SIDEBAR = globalIdent + 'TOGGLE_SIDEBAR'
export const UPDATE_CURRENT_SCRIPT = 'UPDATE_CURRENT_SCRIPT'

export const SYNC_REQUESTED = globalIdent + 'SYNC_REQUESTED'
export const SYNC_SUCCEEDED = globalIdent + 'SYNC_SUCCEEDED'
export const SYNC_REJECTED = globalIdent + 'SYNC_REJECTED'
