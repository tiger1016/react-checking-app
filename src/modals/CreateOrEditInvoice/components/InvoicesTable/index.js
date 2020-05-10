// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Components
import Button from 'GlobalComponents/Button'
import DatePickerInput from 'GlobalComponents/input/DatePicker'
import DiscountTypeSelect from 'GlobalComponents/input/DiscountTypeSelect'
import Loader from 'GlobalComponents/Loader'
import CurrencyInput from 'GlobalComponents/input/CurrencyInput'
import TextInput from 'GlobalComponents/input/TextInput'

// Functions
import handleDelete from '../../functions/handleDelete'
import createRow from '../../functions/createRow'
import handleChange from '../../functions/handleChange'

class InvoicesTable extends React.Component {
  createRow = createRow(this)
  handleChange = handleChange(this)
  handleDelete = handleDelete(this)
  state = {
    customerId: null,
    invoiceList: [],
    oldInvoiceList: []
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const {
      updateTotals,
      customerId,
      invoiceList
    } = nextProps

    if (customerId !== prevState.customerId || !_.isEqual([...prevState.oldInvoiceList], [...invoiceList])) {
      updateTotals(invoiceList)
      return {
        customerId,
        invoiceList: [...invoiceList],
        oldInvoiceList: [...invoiceList]
      }
    }

    return {
      customerId
    }
  }

  selectClosed = () => {
    const container = document.querySelector('.create-invoice-row-container')
    container.style.paddingBottom = null
  }

  updateTotals = (invoiceList) => {
    const {
      updateTotals
    } = this.props
    updateTotals(invoiceList)
  }

  selectOpened = (rowNumber, selectType) => {
    let height = 0
    if (selectType === 'date') {
      height = 300 - (this.state.invoiceList.length - rowNumber) * 45
    } else {
      const menu = document.querySelector(`.row-${rowNumber} .${selectType} .Select-menu-outer`)
      height = menu.offsetHeight
    }
    const container = document.querySelector('.create-invoice-row-container')
    container.style.paddingBottom = height ? height + 'px' : null
    container.scrollTop = height
  }

  render () {
    const {
      loading,
      customerId
    } = this.props
    const {
      invoiceList
    } = this.state

    const dateWidth = 130
    const itemWidth = 180
    const quantityWidth = 50
    const amountWidth = 70
    const discountWidth = 70
    const discountDropdownWidth = 70
    const deleteWidth = 40

    return <div>
      <div className='invoice-profile-table-container'>
        <div className='invoice-profile-table'>
          <div className='invoice-heading-padding'>
            <span className='header-style' style={{ width: `${dateWidth}px` }}>DATE</span>
            <span className='header-style' style={{ width: `${itemWidth}px` }}>ITEM</span>
            <span className='header-style' style={{ width: `${quantityWidth}px` }}>Q-TY</span>
            <span className='header-style' style={{ width: `${amountWidth}px` }}>AMOUNT</span>
            <span className='header-style' style={{ width: `${discountWidth}px` }}>DISCOUNT</span>
            <span className='header-style' style={{ width: `${discountDropdownWidth}px` }} />
            <span className='header-style' style={{ width: `${deleteWidth}px` }}>DELETE</span>
          </div>
        </div>
      </div>
      <div className='create-invoice-row-container'>
        {invoiceList ? invoiceList.map((term, i) =>
          <div key={i} className={term.addon ? `create-invoice-row addon row-${i}` : `create-invoice-row row-${i}`}>
            <div className='create-invoice-row-item date' style={{ width: dateWidth }}>
              {term.manual ? !term.addon && <DatePickerInput disabled={!term.manual}
                onBlur={this.selectClosed} onChange={(date) => { this.selectClosed(); document.activeElement.blur(); this.handleChange(date, i, 'requested_time') }}
                onFocus={() => this.selectOpened(i, 'date')} value={term.requested_time} />
                : <span className='term-text'>{moment(term.requested_time).format('MM/DD / YYYY ')}</span>}
            </div>
            <div className='create-invoice-row-item service' style={{ width: itemWidth }}>
              {term.manual ? customerId && <TextInput
                onChange={e => this.handleChange(e, i, 'billing_group_description')}
                value={term.billing_group_description} /> : <span className='term-text'>{term.billing_group_description}</span>
              }
            </div>
            <div className='create-invoice-row-item'
              style={{ width: quantityWidth }}>
              <span className='term-text'>{term.quantity}</span>
              {/*
                <TextInput
                disabled={!term.manual} number
                onChange={e => this.handleChange(e, i, 'quantity')}
                value={term.quantity} />
              */}
            </div>
            <div className='create-invoice-row-item' style={{ width: amountWidth }}>
              <CurrencyInput noIcon
                onChange={e => this.handleChange(e, i, 'amount')}
                value={term.amount && term.amount > 0 ? parseFloat(term.amount).toFixed(2) : ''
                } />
            </div>
            <div className='create-invoice-row-item' style={{ width: discountWidth }}>
              <TextInput number onChange={e => this.handleChange(e, i, 'discount_amount')} value={term.discount_amount} />
            </div>
            <div className='create-invoice-row-item discount-type' style={{ width: discountDropdownWidth }}>
              <DiscountTypeSelect onChange={e => this.handleChange(e, i, 'discount_type')}
                onClose={this.selectClosed}
                onOpen={() => this.selectOpened(i, 'discount-type')}
                value={term.discount_type} />
            </div>
            <div className='create-invoice-row-item' style={{ width: deleteWidth }}>
              <Button iconOnly={'ion-android-delete'} onClick={e => this.handleDelete(e, i)} textOnly />
            </div>
          </div>
        ) : null}
        {loading && <Loader fadeIn='quarter' />}
      </div>
      <div className='approve'>
        <button onClick={this.createRow}> <u> +add another line item </u></button>
      </div>
    </div>
  }
}

InvoicesTable.propTypes = {
  customerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  invoiceList: PropTypes.array,
  loading: PropTypes.bool,
  updateTotals: PropTypes.func
}

const mapStateToProps = (state, props) => {
  const { app, customers, invoices } = state
  const { customerId } = props

  // Invoice
  const invoiceId = app.modal.data.invoiceId

  let invoiceList = []
  if (invoiceId) {
    const invoice = invoices.invoices.find(i => `${i.invoice_id}` === `${invoiceId}`) || {}

    invoiceList = (invoice && invoice.items && invoice.items.map(i => ({
      ...i,
      isAddon: true && i.addon_id,
      billing_group_description: `${i.addon_id ? i.addon_description && i.addon_description : i.billing_group_description && i.billing_group_description}`
    }))) || []
  } else {
    // Customer
    const customer = customers.customers.find(c => `${c.user_id}` === `${customerId}`)
    const customerUnbilledServices = customer && customer.unbilledServices ? customer.unbilledServices : []

    // New invoice terms are unbilled services
    invoiceList = customerUnbilledServices.map(u => ({
      ...u,
      amount: u.cost,
      billing_group_description: u.dropdown_description,
      discount_type: u.discount_type || 'dollar',
      parent_id: u.billing_price_group_id,
      quantity: 1,
      isUnbilledService: true
    }))

    // And new invoice terms are also addons
    invoiceList.forEach(i => {
      if (i.addons && i.addons.length > 0) {
        i.addons.forEach(a => {
          invoiceList.push({
            isAddon: true,
            amount: a.addon_price,
            billing_group_description: a.name,
            discount_type: a.discount_type || 'dollar',
            discount_amount: a.discount_amount,
            id: a.id,
            parent_id: i.billing_price_group_id,
            quantity: 1,
            requested_time: i.requested_time,
            isUnbilledService: true
          })
        })
      }
    })
  }

  invoiceList = invoiceList.map(i => ({
    ...i,
    manual: !i.billing_group_id && !i.addon_id && !i.isUnbilledService
  }))

  // Other
  const loading = invoices.loading || customers.loading

  return {
    invoiceList,
    loading
  }
}

export default connect(mapStateToProps)(InvoicesTable)
