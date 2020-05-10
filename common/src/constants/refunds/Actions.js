// Constants
import { ACTIONS_BASE } from '../globals'

const globalIdent = ACTIONS_BASE + 'REFUNDS/'

/*
  Refunds
*/
export const FETCH_REFUNDS_REJECTED = globalIdent + 'FETCH_REFUNDS_REJECTED'
export const FETCH_REFUNDS_REQUESTED = globalIdent + 'FETCH_REFUNDS_REQUESTED'
export const FETCH_REFUNDS_SUCCEDED = globalIdent + 'FETCH_REFUNDS_SUCCEDED'

export const ISSUE_REFUNDS_REJECTED = globalIdent + 'ISSUE_REFUNDS_REJECTED'
export const ISSUE_REFUNDS_REQUESTED = globalIdent + 'ISSUE_REFUNDS_REQUESTED'
export const ISSUE_REFUNDS_SUCCEDED = globalIdent + 'ISSUE_REFUNDS_SUCCEDED'
