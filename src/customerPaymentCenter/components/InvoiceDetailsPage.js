// Libraries
import React, { Component } from 'react'

// Styles
import '../index.css'

// Components
import { InvoiceRowHeader } from './invoiceInfo/InvoiceRowHeader'
import { InvoiceRow } from './invoiceInfo/InvoiceRow'
import { TotalComponent } from './invoiceInfo/TotalComponent'

export class InvoiceDetailsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoices: {}
    }
    this.valueAfterDelete = this.valueAfterDelete.bind(this)
    this.savedData = this.savedData.bind(this)
  }

  componentWillMount () {
    var invoices = this.props.invoices

    this.setState({ invoices: invoices, loading: this.props.loading })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ invoices: nextProps.invoices, loading: nextProps.loading })
  }

  valueAfterDelete (allInvoiceData) {
    this.setState({ invoices: allInvoiceData })
  }

  savedData (data) {
    console.log('isnide of saced data', data)
  }

  render () {
    let invoices = {}
    if (this.state.invoices) { invoices = this.state.invoices.invoice }

    // var selectedInvoices = []
    console.log('inl', invoices)
    // Object.keys(invoices).forEach(function (key) {
    //   if (invoices[key].invoice_id) {
    //     selectedInvoices.push(invoices[key])
    //   }
    // })

    return (
      <div>
        {invoices && <div className='header-container' />}
        <div className='body-container' style={{ height: '100%', width: '100%' }}>
          <InvoiceRowHeader />
          {this.state.loading && <div>loading</div>}
          {invoices && <div className='rows-scroll' style={{ height: 'auto', maxHeight: '610px', width: '100%' }} >
            {invoices.map((invoice, i) =>
              <InvoiceRow key={i} allInvoice={invoices} valueAfterDelete={this.valueAfterDelete} savedData={this.savedData} invoice={invoice} />
            )}
          </div>}

        </div>
        {invoices && <div>
          <TotalComponent invData={invoices} />
        </div>}
      </div>
    )
  }
}
