// Libraries
import React from 'react'

// Controllers
import { walksController } from 'Controllers'

// Utils
import { utility } from 'Utils'

// Styles
import './index.css'

export default class CostSummary extends React.Component {
  getTotalCosts = () => Number(this.getTotalAddonsCost(this.props.selectedAddons)) + Number(this.getTotalServicesCost(this.props.selectedService))
  getTotalAddonsCost = selectedAddons => {
    let _tempTotal = 0
    if (selectedAddons) {
      selectedAddons.forEach(a => {
        _tempTotal += parseFloat(a.addon_price || 0)
      })
    }
    return _tempTotal
  }
  getDiscountCost = () => {
    const { selectedDiscount, selectedDiscountType } = this.props
    if (selectedDiscountType === 'percent') {
      return (this.getTotalCosts() * selectedDiscount) / 100
    }
    return selectedDiscount
  }
  getTotalServicesCost = selectedService => (selectedService ? (Number(selectedService.customer_cost) || Number(selectedService.cost) || 0) : 0)

  render () {
    return <div className='CostSummary'>
      <span className='title'>Cost summary</span>
      <div className='CostSummary-container'>
        <div className='CostSummary-column-two'>
          <div className='CostSummary-info-cost'>
            <div className='service-cost'>{`Service Cost: $${utility.numberToCurrency(this.getTotalServicesCost(this.props.selectedService))}`}</div>
            {this.props.selectedDiscount && <div className='service-cost'>{`Discount Applied: $${utility.numberToCurrency(this.getDiscountCost())}`}</div>}
            {walksController.walkHasAddons(this.props.walk) || this.props.selectedAddons.length ? <div className='addon-cost'>{`Add-on Cost: $${utility.numberToCurrency(this.getTotalAddonsCost(this.props.selectedAddons))}`}</div> : null}
          </div>
          <div className='CostSummary-total-cost'>
            {`Total Cost: $${utility.numberToCurrency(this.getTotalCosts() - this.getDiscountCost())}`}
          </div>
        </div>
      </div>
    </div>
  }
}
