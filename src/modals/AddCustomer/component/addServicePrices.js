// Libraries
import React, { Component } from 'react'

// Functions
import { SortCustomerAddonsByName } from 'Functions/addons'
import { SortServices } from 'Functions/services'

export default class AddServicePrices extends Component {
  handleInputChangeForService = (item) => {
    let temp = this.props.services
    temp.map(function (value, index) {
      if (value.dropdown_description === item.target.name) {
        let cost = parseFloat(item.target.value)
        value.customer_cost = cost
      }
    })
    this.props.setParentState(temp, 'services')
  }

  handleInputChangeForAddons = (item) => {
    let temp = this.props.addons
    temp.map(function (value, index) {
      if (value.name === item.target.name) {
        let cost = parseFloat(item.target.value)
        value.customer_addons_cost = cost
      }
    })
    this.props.setParentState(temp, 'addons')
  }

  render () {
    let addons = []
    let services = []
    if (this.props.services) { services = SortServices(this.props.services, 'name') }
    if (this.props.addons) { addons = SortCustomerAddonsByName(this.props.addons) }
    return <div className='sub-align'>
      <div className='add-customer-title'>Services</div>
      <div className='table-container'>
        <div className='rate-row-edit-rates' style={{ padding: '2px 50px 2px 30px', height: '35px' }}>
          <div style={{ width: '33%', display: 'inline-block' }} >
            <span className='row-span' style={{ color: '#808080' }}>SERVICE TYPE</span>
          </div>
          <div style={{ width: '33%', display: 'inline-block', textAlign: 'center' }}>
            <span className='row-span' style={{ color: '#808080' }}>COMPANY PRICE</span>
          </div>
          <div style={{ width: '33%', display: 'inline-block', textAlign: 'center' }}>
            <span className='row-span' style={{ color: '#808080' }}>CUSTOMER PRICE</span>
          </div>
        </div>
        <div className='container'>
          {services.map((service, i) =>
            <div key={i} className='rate-row-edit-rates2' >
              <div style={{ width: '33%', display: 'inline-block', verticalAlign: 'middle' }}>
                <span className='row-span' style={{ color: '#808080' }}>{service.dropdown_description}</span>
              </div>
              <div style={{ width: '33%', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle' }}>
                <span className='row-span' style={{ color: '#808080' }}>${parseFloat(service.cost).toFixed(2)}</span>
              </div>
              <div style={{ width: '33%', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle' }} >
                <span className='row-span' style={{ color: '#999999', paddingRight: '5px' }}> $</span>
                <input type='number' style={{ width: '50px', height: '30px', borderRadius: '3px', border: '1px solid #DADADA', color: '#999999', textAlign: 'center', fontSize: '12px' }} onChange={this.handleInputChangeForService} name={service.dropdown_description} value={service.customer_cost} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='add-customer-title'>Addons</div>
      <div className='table-container'>
        <div className='rate-row-edit-rates' style={{ padding: '2px 50px 2px 30px', height: '35px' }}>
          <div style={{ width: '33%', display: 'inline-block' }}>
            <span className='row-span' style={{ color: '#808080' }}>ADDONS</span>
          </div>
          <div style={{ width: '33%', display: 'inline-block', textAlign: 'center' }}>
            <span className='row-span' style={{ color: '#808080' }}>COMPANY PRICE</span>
          </div>
          <div style={{ width: '33%', display: 'inline-block', textAlign: 'center' }} >
            <span className='row-span' style={{ color: '#808080' }}>CUSTOMER PRICE</span>
          </div>
        </div>
        <div className='container' >
          {addons.map((addon, i) =>
            <div key={i} className='rate-row-edit-rates2' >
              <div style={{ width: '33%', display: 'inline-block', verticalAlign: 'middle' }}>
                <span className='row-span' style={{ color: '#808080' }}>{addon.name}</span>
              </div>
              <div style={{ width: '33%', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle' }}>
                <span className='row-span' style={{ color: '#808080' }}>${parseFloat(addon.addon_price || 0).toFixed(2)}</span>
              </div>
              <div style={{ width: '33%', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle' }} >
                <span className='row-span' style={{ color: '#999999', paddingRight: '5px' }}> $</span>
                <input type='number' style={{ width: '50px', height: '30px', borderRadius: '3px', border: '1px solid #DADADA', color: '#999999', textAlign: 'center', fontSize: '12px' }} onChange={this.handleInputChangeForAddons} name={addon.name} value={addon.customer_addons_cost} />
              </div>
            </div>
          ) }
        </div>
      </div>
    </div>
  }
}
