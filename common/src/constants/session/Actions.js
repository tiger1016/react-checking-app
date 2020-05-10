// Constants
import { ACTIONS_BASE } from '../globals'

const globalIdent = ACTIONS_BASE + 'SESSION/'

export const DESTROY_SESSION = globalIdent + 'DESTROY_SESSION'

export const LOGIN_REJECTED = globalIdent + 'LOGIN_REJECTED'
export const LOGIN_REQUESTED = globalIdent + 'LOGIN_REQUESTED'
export const LOGIN_SUCCEDED = globalIdent + 'LOGIN_SUCCEDED'

export const SESSION_INFO_REJECTED = globalIdent + 'SESSION_INFO_REJECTED'
export const SESSION_INFO_REQUESTED = globalIdent + 'SESSION_INFO_REQUESTED'
export const SESSION_INFO_SUCCEDED = globalIdent + 'SESSION_INFO_SUCCEDED'

export const FETCH_WALKER_SUCCEDED = globalIdent + 'FETCH_WALKER_SUCCEDED'

export const UPDATE_SESSION_TOKEN = globalIdent + 'UPDATE_SESSION_TOKEN'
