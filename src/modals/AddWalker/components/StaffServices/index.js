// Libraries
import React from 'react'

// Component
import CurrencyInput from 'GlobalComponents/input/CurrencyInput'
import DiscountTypeSelect from 'GlobalComponents/input/DiscountTypeSelect'
import PercentInput from 'GlobalComponents/input/PercentInput'

export class Rows extends React.Component {
  state = {
    manualPercent: null,
    type: 'dollar'
  }
  typeOnChange = type => {
    this.setState({ type })
  }

  handleAmountFromPercentage = (e) => {
    const { handleServicesInputChange, service } = this.props
    const { target: { value: manualPercent } } = e
    this.setState({ manualPercent }, () => {
      const { manualPercent } = this.state
      handleServicesInputChange({
        ...e,
        target: {
          ...e.target,
          value: parseFloat(manualPercent) * parseFloat(service.cost)
        }
      }, service.id)
    })
  }

  render () {
    const {
      handleServicesInputChange,
      payrollType,
      service
    } = this.props
    const { type, manualPercent } = this.state

    let mode = null
    if (payrollType === 'dollar' && type.value === 'percent') {
      mode = 'percent'
    }

    const finalValue = parseFloat(service.staff_pay_rate || service.default_walker_payroll || 0).toFixed(2) || ''

    return (
      <div className='row-container'>
        <div className='column-container payrollname-container'>
          <span className='text'>{service.dropdown_description}</span>
        </div>
        <div className='column-container payrollprice-container'>
          <span className='text'>${parseFloat(service.cost || 0).toFixed(2)}</span>
        </div>
        <div className='column-container payrollmember-container'>
          {payrollType === 'dollar' && <DiscountTypeSelect onChange={this.typeOnChange} value={type} />}
          {payrollType === 'percent' && <PercentInput name={service.id}
            onChange={(e) => handleServicesInputChange(e, service.id)}
            value={parseFloat(finalValue).toFixed(2)} />}
          {(payrollType === 'dollar' && mode !== 'percent') && <CurrencyInput
            name={service.id}
            onChange={(e) => handleServicesInputChange(e, service.id)}
            value={finalValue}
          />}
          {(mode === 'percent') && <PercentInput name={service.id}
            onChange={this.handleAmountFromPercentage}
            value={parseFloat(manualPercent || 0).toFixed(2) || ''} />}
          {(mode === 'percent' && manualPercent) && <div className='manual-percent-value'>
            ${finalValue}
          </div>}
        </div>
      </div>
    )
  }
}

export default class StaffServices extends React.Component {
  render () {
    const {
      children,
      handleServicesInputChange,
      payrollType,
      services
    } = this.props
    return (
      <div className='ProfileModal-Add-contact-container'>
        <div className='ProfileModal-ContentContainer'>
          <div className='header'>Services</div>
          <div className='table-container'>
            <div className='header-container'>
              <div className='header-style payrollname-container'>Service Type</div>
              <div className='header-style payrollprice-container'>Company Price</div>
              <div className='header-style payrollmember-container'>Staff Payroll</div>
            </div>
            <div className='row-scroll'>
              {services ? services.map((service, i) => <Rows
                key={i}
                payrollType={payrollType}
                service={service}
                handleServicesInputChange={handleServicesInputChange}
              />) : ''}
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }
}
