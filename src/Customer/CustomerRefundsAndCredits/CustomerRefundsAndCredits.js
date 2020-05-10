// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

// Controllers
import { appController } from 'Controllers/appController'
import { creditsController } from 'Controllers/creditsController'
import { refundsController } from 'Controllers/refundsController'

// Actions
import fetchCredits from 'Actions/credits/fetchCredits'

// Utils
import { utility } from 'Utils/utility'

// Components
import Button from 'GlobalComponents/Button'
import CustomTable from 'GlobalComponents/CustomTable'
import SectionHeader from 'GlobalComponents/SectionHeader'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

// Styles
import './index.css'

class CustomerRefundsAndCredits extends React.PureComponent {
  componentDidMount () {
    const { credits, fetchCredits, refunds } = this.props
    if (!credits || credits.length < 1) { fetchCredits() }
    if (!refunds || refunds.length < 1) refundsController.actions.fetchRefunds()
  }

  openIssueCreditModal = () => {
    const { customer } = this.props

    appController.actions.toggleModal({
      canClose: true,
      data: { customer },
      isOpen: true,
      modalIdentifier: appController.constants.ISSUE_CREDIT_MODAL_IDENTIFIER
    })
  }
  openIssueRefundModal = () => {
    const { customer } = this.props

    appController.actions.toggleModal({
      canClose: true,
      data: { customer },
      isOpen: true,
      modalIdentifier: appController.constants.ISSUE_REFUND_MODAL_IDENTIFIER
    })
  }

  render () {
    let {
      credits,
      creditsUsed,
      refunds,
      refundsIsLoading,
      creditsIsLoading
    } = this.props

    credits = credits.map(c => ({ ...c, amount: c.credits_given, status: 'unused' }))
    creditsUsed = creditsUsed.map(c => ({ ...c, amount: c.credits_used, status: 'used' }))
    let creditUNusedTotal = !credits.length ? 0 : Object.keys(credits).map(key => credits[key].amount).reduce((previous, current) => Number.parseFloat(previous) + Number.parseFloat(current))
    let creditUsedTotal = !creditsUsed.length ? 0 : Object.keys(creditsUsed).map(key => creditsUsed[key].amount).reduce((previous, current) => Number.parseFloat(previous) + Number.parseFloat(current))
    credits = [...credits, ...creditsUsed]
    let refundTotal = !refunds.length ? 0 : Object.keys(refunds).map(key => refunds[key].amount).reduce((previous, current) => Number.parseFloat(previous) + Number.parseFloat(current))
    let creditTotal = creditUNusedTotal - creditUsedTotal

    return <div id='CustomerRefundsAndCredits'>
      <div className='half-width-screen'>
        <SectionHeader align='left' title='Refunds' noPadding rightComponent={<Button onClick={this.openIssueRefundModal} text='ISSUE REFUND' round />} />
        <div className='full-width-section'>
          {(refundsIsLoading || (refunds && refunds.length > 0)) && <CustomTable
            data={refunds.reverse()}
            defaultPageSize={5}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
            loading={refundsIsLoading}
            columns={[{
              columns: [
                {
                  accessor: d => moment(d.ts).format('MM/DD/YYYY'),
                  className: 'text',
                  Footer: <div className='totals'>Total</div>,
                  id: 'ts',
                  label: 'Date'
                },
                {
                  accessor: d => `$${utility.numberToCurrency(d.amount)}`,
                  className: 'text',
                  id: 'amount',
                  Footer: `$${utility.numberToCurrency(refundTotal)}`,
                  label: 'Amount'
                }
              ]
            }]}
          />}
          {!refundsIsLoading && (!refunds || refunds.length === 0) &&
            <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No refunds.`} /></div>
          }
        </div>
      </div>
      <div className='half-width-screen'>
        <SectionHeader align='left' title='Credits' noPadding rightComponent={<Button onClick={this.openIssueCreditModal} text='ISSUE CREDIT' round />} />
        <div className='full-width-section'>
          {(creditsIsLoading || (credits && credits.length > 0)) && <CustomTable
            data={credits}
            defaultPageSize={5}
            pageSizeOptions={[5, 10, 20, 30, 50, 100]}
            loading={creditsIsLoading}
            columns={[{
              columns: [
                {
                  accessor: d => moment(d.ts).format('MM/DD/YYYY'),
                  className: 'text',
                  id: 'ts',
                  label: 'Date'
                },
                {
                  accessor: d => utility.capitalizeFirstLetter(d.status),
                  className: 'text',
                  id: 'status',
                  label: 'Status'
                },
                {
                  accessor: d => d.invoice_id,
                  className: 'text',
                  Footer: <div className='totals'>Total</div>,
                  id: 'invoice_id',
                  label: 'Invoice Id'
                },
                {
                  accessor: d => `$${utility.numberToCurrency(d.amount / 100)}`,
                  className: 'text',
                  Footer: `$${utility.numberToCurrency(creditTotal / 100)}`,
                  id: 'amount',
                  label: 'Credit'
                }
              ]
            }]}
          />}
          {!creditsIsLoading && (!credits || credits.length === 0) &&
            <div className='empty'><CenteredTextNotify icon='ion-ios-checkmark' text={`No credits.`} /></div>
          }
        </div>
      </div>
    </div>
  }
}

CustomerRefundsAndCredits.propTypes = {
  credits: PropTypes.array,
  creditsIsLoading: PropTypes.bool,
  creditsUsed: PropTypes.array,
  customerId: PropTypes.string.isRequired,
  refunds: PropTypes.array,
  refundsIsLoading: PropTypes.bool
}

const mapStateToProps = (state, props) => {
  const { customerId } = props

  const customer = state.customers.customers.find(c => `${c.user_id}` === `${customerId}`)
  const credits = creditsController.selectCreditsOfCustomer(state, customer.user_id)
  const creditsUsed = creditsController.selectCreditsUsedOfCustomer(state, customer.user_id)
  const refunds = refundsController.selectRefundsOfCustomer(state, customer.user_id)

  return {
    customer,
    credits,
    creditsIsLoading: state.credits.loading,
    creditsUsed,
    refunds,
    refundsIsLoading: state.refunds.loading
  }
}

const mapDispatchToProps = {
  fetchCredits
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRefundsAndCredits)
