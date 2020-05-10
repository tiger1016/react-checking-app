// Libraries
import { combineReducers } from 'redux'

// Reducers
import activity from './reports-activity-reducer'
import customerInfo from './reports-customerInfo-reducer'
import customerMailing from './reports-customerMailing-reducer'
import disbursement from './reports-disbursement-reducer'
import payroll from './reports-payroll-reducer'
import receivables from './reports-receivables-reducer'
import qrcodes from './reports-qrcodes-reducer'
import sales from './reports-sales-reducer'
import transaction from './reports-transaction-reducer'
import walkAudit from './reports-walkAudit-reducer'

export default combineReducers({
  activity,
  customerInfo,
  customerMailing,
  disbursement,
  payroll,
  receivables,
  sales,
  transaction,
  qrcodes,
  walkAudit
})
