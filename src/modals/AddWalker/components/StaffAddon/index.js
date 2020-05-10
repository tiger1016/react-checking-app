// Libraries
import React, { Component } from 'react'

// Component
import CurrencyInput from 'GlobalComponents/input/CurrencyInput'
import DiscountTypeSelect from 'GlobalComponents/input/DiscountTypeSelect'
import PercentInput from 'GlobalComponents/input/PercentInput'
export class Rows extends Component {
  state = {
    manualPercent: null,
    type: 'dollar'
  }
  typeOnChange = type => {
    this.setState({ type })
  }

  handleAmountFromPercentage = (e) => {
    const { handleAddonsInputChange, addon } = this.props
    const { target: { value: manualPercent } } = e
    this.setState({ manualPercent }, () => {
      const { manualPercent } = this.state
      handleAddonsInputChange({
        ...e,
        target: {
          ...e.target,
          value: parseFloat(manualPercent) * parseFloat(addon.addon_price)
        }
      }, addon.id)
    })
  }

  render () {
    let {
      addon, payrollType,
      handleAddonsInputChange
    } = this.props
    const { type, manualPercent } = this.state

    let mode = null
    if (payrollType === 'dollar' && type.value === 'percent') {
      mode = 'percent'
    }

    const finalValue = parseFloat(addon.addon_pay_price || addon.default_walker_payroll || 0).toFixed(2) || ''

    console.log(addon.default_walker_payroll)

    return (
      <div className='row-container' >
        <div className='column-container payrollname-container'>
          <span className='text'>{addon.addon_name}</span>
        </div>
        <div className='column-container payrollprice-container'>
          <span className='text'>${parseFloat(addon.addon_price || 0).toFixed(2)}</span>
        </div>
        <div className='column-container payrollmember-container'>
          {payrollType === 'dollar' && <DiscountTypeSelect onChange={this.typeOnChange} value={type} />}
          {payrollType === 'percent' && <PercentInput
            name={addon.id}
            onChange={(e) => handleAddonsInputChange(e, addon.id)}
            value={finalValue}
          />}
          {(payrollType === 'dollar' && mode !== 'percent') && <CurrencyInput
            name={addon.id}
            onChange={(e) => handleAddonsInputChange(e, addon.id)}
            value={finalValue}
          />}
          {(mode === 'percent') && <PercentInput name={addon.id}
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

export default class StaffAddon extends Component {
  render () {
    let {
      children,
      handleAddonsInputChange,
      payrollType,
      addons
    } = this.props

    return (
      <div className='ProfileModal-Add-contact-container'>
        <div className='ProfileModal-ContentContainer'>
          <div className='header'>Add-ons</div>
          <div className='table-container'>
            <div className='header-container'>
              <div className='header-style payrollname-container'>Add-ons Type</div>
              <div className='header-style payrollprice-container'>Company Price</div>
              <div className='header-style payrollmember-container'>Staff Payroll</div>
            </div>
            <div className='row-scroll'>
              {addons ? addons.map((addon, i) => <Rows
                key={i}
                payrollType={payrollType}
                addon={addon}
                handleAddonsInputChange={handleAddonsInputChange}
              />) : ''}
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }
}
