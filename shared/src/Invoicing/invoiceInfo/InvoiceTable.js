// Libraries
import React, { Component } from 'react'

// Components
import { InvoiceRow } from './InvoiceRow'
import { TotalComponent } from './TotalComponent'
import Pagination from '../../../web/globalComponents/Pagination'

export class InvoiceTable extends Component {
  constructor (props) {
    super(props)
    this.state = { initialPage: 1 }
    this.PageChange = this.PageChange.bind(this)
    this.filterpaging = this.filterpaging.bind(this)
  }

  PageChange (pageno) {
    this.setState({
      initialPage: pageno
    })
  }

  filterpaging (val, index) {
    var endindex = this.state.initialPage * 10
    var startindex = endindex - 10
    if (index > startindex && index < endindex) {
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <div className='body-container'>
        {/* <InvoiceRowHeader />           */}
        {this.props.selectedInvoices && <div className='rows-scroll'>
          {this.props.selectedInvoices.filter(this.filterpaging).map((invoice, i) =>
            <InvoiceRow selectInvoice={this.props.selectInvoice} key={i} invoice={invoice} />
          )}
        </div>}
        <TotalComponent invData={this.props.selectedInvoices} />
        <Pagination onChangePage={this.PageChange} pageSize={this.props.selectedInvoices.length} initialPage={this.state.initialPage} />
      </div>
    )
  }
}
