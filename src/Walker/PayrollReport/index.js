// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

// Styles
import './index.css'

// Controller
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

// Controllers
import {
  appController,
  reportsController,
  walkersController
} from 'Controllers'

class PayrollReport extends React.Component {
  componentWillMount () {
    const {
      walkerId,
      walkerPayrolls,
      walkersLoading
    } = this.props
    if (!walkerPayrolls && !walkersLoading) {
      walkersController.actions.fetchWalkerPayRoll(walkerId)
    }
  }

  openPayrollDetailModal = (data) => {
    appController.actions.toggleModal({
      canClose: true,
      data: { PayrollDetail: data, TotalAmount: this.totalcount(data.items) },
      isOpen: true,
      modalIdentifier: appController.constants.PAYROLL_DETAIL_MODAL_IDENTIFIER
    })
  }

  sendPayrollReport = (payrollId, e) => {
    if (e) { e.stopPropagation() }
    reportsController.actions.sendPayrollReport(payrollId)
  }

  totalcount = (items) => {
    let amount = 0
    if (items) {
      items.map((val) => { amount = amount + parseFloat(val.total_amount) })
    }
    return amount.toFixed(2)
  }

  render () {
    const { walkerPayrolls, walkersLoading } = this.props
    const walkerPayroll = walkerPayrolls || []

    return (
      <div id='WalkerPayrollContainer'>
        {((walkerPayroll && walkerPayroll.length > 0) || walkersLoading) && <CustomTable
          data={walkerPayroll}
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: () => this.openPayrollDetailModal(rowInfo.original)
          })}
          loading={walkersLoading}
          columns={[{
            columns: [
              {
                accessor: d => moment(d.date).format('MM/DD/YYYY'),
                className: 'text strong',
                id: 'date',
                label: 'DATE',
                maxWidth: 110
              },
              {
                accessor: 'payroll_id',
                className: 'text',
                label: 'NUMBER',
                maxWidth: 110
              },
              {
                accessor: d => ('$' + this.totalcount(d.items)),
                id: 'amount',
                className: 'text',
                label: 'AMOUNT',
                maxWidth: 100
              },
              {
                accessor: 'payroll_id',
                Cell: d => <div className='action-container'
                  onClick={evt => this.sendPayrollReport(d.original.payroll_id, evt)}>
                  <span className='ion-paper-airplane ions-style' />
                </div>,
                className: 'text',
                label: 'ACTION',
                maxWidth: 80
              }
            ]
          }]}
        />}
        {(!walkerPayroll || walkerPayroll.length === 0) && !walkersLoading && <div className='empty'>
          <CenteredTextNotify icon='ion-ios-checkmark' text='No payrolls' />
        </div>}
      </div>
    )
  }
}

PayrollReport.propTypes = {
  walkerId: PropTypes.string.isRequired,
  walkersLoading: PropTypes.bool,
  walkerPayrolls: PropTypes.array
}

const mapStateToProps = (state, props) => {
  const { walkerId } = props
  const walkersExists = !!state.walkers.walkers.length
  const walker = walkersExists ? state.walkers.walkers.find(c => Number(c.user_id) === Number(walkerId)) : null

  return {
    walkersLoading: state.walkers.loading,
    walkerPayrolls: walker.payrolls
  }
}

export default connect(mapStateToProps)(PayrollReport)
