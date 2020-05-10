// Libraries
import React, { Component } from 'react'
import PayrateEditModal from './PayratesEditModal'

// actions
// import walkerPayrateActions from '../../../../actions/walkers/walkerPayrate'

// Styles
import '../../style.less'

export class PayrollRates extends Component {
  constructor (props) {
    super(props)
    this.togglePayrateEdit = this.togglePayrateEdit.bind(this)
    this.openPayrollDetail = this.openPayrollDetail.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.SavePayrate = this.SavePayrate.bind(this)
    this.SavePayratecallback = this.SavePayratecallback.bind(this)
    this.state = { isPayrateEditModalOpen: false, ModalTitle: '', ModalData: [], payrates: {} }
  }

  togglePayrateEdit (event) {
    if (this.state.isPayrateEditModalOpen) {
      this.setState({ isPayrateEditModalOpen: false })
    } else {
      this.setState({ isPayrateEditModalOpen: true })
    }
  }

  openPayrollDetail (data, title) {
    this.setState({ ModalData: data })
    this.setState({ ModalTitle: title })
    this.setState({ isPayrateEditModalOpen: true })
  }

  SavePayrate (event) {
    // this.props.walkerPayrateActions.editWalkerPayRate(this.props.walkerid, this.state.payrates, this.SavePayratecallback)
    // alert(JSON.stringify(this.state.payrates))
  }

  SavePayratecallback (status, data) {
    this.setState({ isPayrateEditModalOpen: false })
    // alert(status)
  }

  handleInputChange (item) {
    var temp = this.state.payrates
    var tempdata = this.state.ModalData
    tempdata.map(function (value, index) {
      if (value.id === item.target.name) {
        if (item.target.attributes['data-type'].value === 'Payroll Services') {
          value.cost = item.target.value
        } else {
          value.addon_price = item.target.value
        }
      }
    })
    temp[item.target.name] = item.target.value
    this.setState({
      payrates: temp, ModalData: tempdata
    })
  }

  render () {
    const PayRates = this.props.walkerPayrate // addons
    return (
      <div className='walkerpayrate-container'>
        <div className='row-scroll'>
          <div>
            <span className='contact-information-header'>Payroll Services</span>
            <span className='edit-icons-position'><span className='ion-edit icon-circle' onClick={() => this.openPayrollDetail(PayRates.service_types_cost ? PayRates.service_types_cost : [], 'Payroll Services')} /></span>
            <div className='PayrollRates-container'>
              {PayRates.service_types_cost ? PayRates.service_types_cost.map(payrate =>
                <div className='item'><span className='name'>{payrate.dropdown_description}</span><br />
                  <div className='cfix' />
                  <span className='rate'>$ {payrate.cost}</span></div>
              ) : ''}
            </div>
          </div>
          <div>
            <span className='contact-information-header'>Payroll Add-ons</span>
            <span className='edit-icons-position'><span className='ion-edit icon-circle' onClick={() => this.openPayrollDetail(PayRates.addons ? PayRates.addons : [], 'Payroll Add-ons')} /></span>
            <div className='PayrollRates-container'>
              {PayRates.addons ? PayRates.addons.map(payrate =>
                <div className='item'><span className='name'>{payrate.name}</span><br />
                  <div className='cfix' />
                  <span className='rate'>$ {payrate.addon_price}</span></div>
              ) : ''}
            </div>
          </div>
        </div>
        <PayrateEditModal Payrates={this.state.ModalData} SavePayrate={this.SavePayrate} handleInputChange={this.handleInputChange} title={this.state.ModalTitle} isPayrateEditModalOpen={this.state.isPayrateEditModalOpen} togglePayrateEdit={this.togglePayrateEdit} />
      </div>
    )
  }
}
