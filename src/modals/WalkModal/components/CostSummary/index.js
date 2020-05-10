// Libraries
import React from 'react'
import _ from 'lodash'

// Controllers
import { walksController } from 'Controllers'

// Utils
import { utility } from 'Utils'

// Styles
import './index.css'

export default class CostSummary extends React.Component {
  /**
   * Returns cost of all addons plus all services selected
   * @return {Number} Total costs.
   */
  getTotalCosts = () => Number(this.getTotalAddonsCost(this.props.selectedAddons) + this.getTotalServicesCost(this.props.selectedService))
  /**
   * Returns total cost of all addons selected
   * @param  {Array} selectedAddons Selected Addons
   * @return {Number}               Total addons cost
   */
  getTotalAddonsCost = selectedAddons => {
    let addons = _.filter(this.props.addons.addons, a => _.includes(selectedAddons, a.id))
    let totalCost = 0
    addons.forEach(a => {
      if (a && a.addon_price) {
        totalCost += Number(a.addon_price)
      }
    })
    return totalCost || 0
  }
  /**
   * Returns cost service selected (can only select one)
   * @param  {Object} selectedService Selected service
   * @return {Number}                 Service cost
   */
  getTotalServicesCost = selectedService => (selectedService && selectedService.cost ? selectedService.cost : 0)
  render () {
    return <div className='CostSummary'>
      {/* <div className='scanned-wrapper'>
        <div className='CostSummary-scanned-details'>
          {!this.props.isEditModal() || !(this.props.walk && this.props.walk.start) ? null : <div className='scanned-in-out'>
            <div className='scanned-container'>
              <div className='ion-ios-barcode-outline larger icon' />
              <div className='text'><span>Scanned In</span></div>
            </div>
            <div className='scanned'>{(this.props.walk && this.props.walk.start) ? moment(this.props.walk.start).format('h:mmA M/d/YYYY') : ''}</div>
          </div>}
          {!this.props.isEditModal() || !(this.props.walk && this.props.walk.end) ? null : <div className='scanned-in-out out'>
            <div className='scanned-container'>
              <div className='ion-ios-barcode larger icon' />
              <div className='text'><span>Scanned Out</span></div>
            </div>
            <div className='scanned'>{(this.props.walk && this.props.walk.end) ? moment(this.props.walk.end).format('h:mmA M/d/YYYY') : ''}</div>
          </div>}
          {!this.props.isEditModal() || !(this.props.walk && this.props.walk.end) ? null : <div className='scanned-in-out'>
            <div className='scanned-container'>
              <div className='ion-ios-time icon small' />
              <div className='text'><span>Duration</span></div>
            </div>
            <div className='scanned'>{(this.props.walk && this.props.walk.length) ? moment.duration(moment(this.props.walk.start).diff(moment(this.props.walk.end))).humanize() : ''}</div>
          </div>}
        </div>
      </div> */}
      <span>Cost summary</span>
      <div className='CostSummary-container'>
        <div className='CostSummary-column-one' />
        <div className='CostSummary-column-two'>
          <div className='CostSummary-info-cost'>
            <div className='service-cost'>{`Service Cost: $${utility.numberToCurrency(this.getTotalServicesCost(this.props.selectedService))}`}</div>
            {walksController.walkHasAddons(this.props.walk) || this.props.selectedAddons.length ? <div className='addon-cost'>{`Add-on Cost: $${utility.numberToCurrency(this.getTotalAddonsCost(this.props.selectedAddons))}`}</div> : null}
          </div>
          <div className='CostSummary-total-cost'>
            {`Total Cost: $${utility.numberToCurrency(this.getTotalCosts())}`}
          </div>
        </div>
      </div>
    </div>
  }
}
