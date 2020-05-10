// Libraries
import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Controller
import { appController } from 'Controllers/appController'
import { customersController } from 'Controllers/customersController'

// Components
import SectionHeader from 'GlobalComponents/SectionHeader'
import CustomTable from 'GlobalComponents/CustomTable'

// Functions
import SortCustomerAddonsByName from 'Functions/addons/SortCustomerAddonsByName'
import SortServices from 'Functions/services/SortServices'

// Styles
import './index.css'

class CustomerRates extends React.Component {
  state = {
    services: this.props.services,
    addons: this.props.addons
  }

  handleInputChange = (type, index) => evt => {
    if (type === 'addon') {
      const newAddons = _.cloneDeep(this.state.addons)
      newAddons[index].addon_price = evt.target.value
      this.setState({
        addons: newAddons
      })
    } else if (type === 'service') {
      const newServices = _.cloneDeep(this.state.services)
      newServices[index].cost = evt.target.value
      this.setState({
        services: newServices
      })
    }
  }

  rateAddonEdit = (index) => {
    this.setState({
      addons: this.props.addons.map((a, i) => i === index ? { ...a, isEdit: true } : { ...a, isEdit: false })
    })
  }

  rateServiceEdit = (index) => {
    this.setState({
      services: this.props.services.map((s, i) => i === index ? { ...s, isEdit: true } : { ...s, isEdit: false })
    })
  }

  rateAddonSave = (payrate, index) => {
    const originalAddon = this.props.addons.find(a => a.id === payrate.id)
    if (Number(originalAddon.addon_price) !== Number(payrate.addon_price)) {
      const { customerId } = this.props
      const reqPayrate = {}
      reqPayrate[payrate.id] = payrate.addon_price
      appController.confirmSaveChanges(() => {
        customersController.actions.updateAddonRates(customerId, reqPayrate)
        this.setState({
          addons: this.state.addons.map(a => ({ ...a, isEdit: false }))
        })
      },
      'This change will be applied to all future appointments. Do you wish to continue?')
    }
  }

  rateServiceSave = (payrate, index) => {
    const originalService = this.props.services.find(a => a.id === payrate.id)
    if (Number(originalService.cost) !== Number(payrate.cost)) {
      const { customerId } = this.props
      const reqPayrate = {}
      reqPayrate[payrate.id] = payrate.cost
      appController.confirmSaveChanges(() => {
        customersController.actions.updateServiceRates(customerId, reqPayrate)
        this.setState({
          services: this.state.services.map(s => ({ ...s, isEdit: false }))
        })
      },
      'This change will be applied to all future appointments. Do you wish to continue?')
    }
  }

  handleEnterEscKey = (type, payrate, index) => evt => {
    const key = evt.keyCode
    if (type === 'addon') {
      if (key === 27) {
        evt.preventDefault()
        evt.stopPropagation()
        this.setState({
          addons: this.props.addons.map(a => ({ ...a, isEdit: false }))
        })
      } else if (key === 13) {
        evt.preventDefault()
        evt.stopPropagation()
        this.rateAddonSave(payrate, index)
      }
    } else if (type === 'service') {
      if (key === 27) {
        evt.preventDefault()
        evt.stopPropagation()
        this.setState({
          services: this.props.services.map(s => ({ ...s, isEdit: false }))
        })
      } else if (key === 13) {
        evt.preventDefault()
        evt.stopPropagation()
        this.rateServiceSave(payrate, index)
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!_.isEqual(nextProps.services, this.props.services) ||
      !_.isEqual(nextProps.addons, this.props.addons) ||
      !_.isEqual(nextState.services, this.state.services) ||
      !_.isEqual(nextState.addons, this.state.addons) ||
      nextProps.loading !== this.props.loading ||
      nextProps.customersLoading !== this.props.customersLoading ||
      nextProps.customerId !== this.props.customerId) {
      return true
    }
    return false
  }

  render () {
    const { customersLoading } = this.props
    const { services, addons } = this.state
    return <div id='CustomerRates'>
      <div className='payroll-services-container'>
        <SectionHeader title='Service Rates' />
        <div className='inner-container'>
          <div className='left'>
            <CustomTable
              data={services.filter((item, i) => { return i % 2 === 0 })}
              minRows={0}
              loading={customersLoading}
              showPagination={false}
              pageSize={services.length / 2 + 1}
              className='-striped -highlight'
              noDataText='No rates found'
              style={{
                height: '300px' // This will force the table body to overflow and scroll, since there is not enough room
              }}
              columns={[{
                columns: [
                  {
                    accessor: 'label',
                    className: 'text strong',
                    label: 'SERVICE'
                  },
                  {
                    Cell: (d) => <span className='rate'>$ &nbsp;{d.original.isEdit
                      ? <ControlledPayRateInput
                        data={d}
                        handleEnterEscKey={this.handleEnterEscKey('service', d.original, d.index * 2)}
                        handleInputChange={this.handleInputChange('service', d.index * 2)}
                        value={d.original.cost} />
                      : parseFloat(d.original.cost).toFixed(2)}</span>,
                    id: 'amount',
                    className: 'text',
                    label: 'RATE',
                    maxWidth: 120
                  }, {
                    accessor: 'action',
                    Cell: (d) => <span className='rate'>
                      {d.original.isEdit
                        ? <span className='icon ion-checkmark-round' style={{ fontSize: '18px' }} onClick={() => this.rateServiceSave(d.original, d.index * 2)} />
                        : <span className='icon ion-edit' style={{ fontSize: '18px' }} onClick={() => this.rateServiceEdit(d.index * 2)} />}
                    </span>,
                    className: 'text',
                    label: '',
                    maxWidth: 100
                  }]
              }]} />
          </div>
          <div className='right'>
            <CustomTable
              data={services.filter((item, i) => { return i % 2 !== 0 })}
              minRows={0}
              loading={customersLoading}
              showPagination={false}
              pageSize={services.length / 2 + 1}
              className='-striped -highlight'
              style={{
                height: '300px' // This will force the table body to overflow and scroll, since there is not enough room
              }}
              columns={[{
                columns: [
                  {
                    accessor: 'label',
                    className: 'text strong',
                    label: 'SERVICE'
                  },
                  {
                    Cell: (d) => <span className='rate'>$ &nbsp;{d.original.isEdit
                      ? <ControlledPayRateInput
                        data={d}
                        handleEnterEscKey={this.handleEnterEscKey('service', d.original, d.index * 2 + 1)}
                        handleInputChange={this.handleInputChange('service', d.index * 2 + 1)}
                        value={d.original.cost} />
                      : parseFloat(d.original.cost).toFixed(2)}</span>,
                    id: 'amount',
                    className: 'text',
                    label: 'RATE',
                    maxWidth: 120
                  }, {
                    accessor: 'action',
                    Cell: (d) => <span className='rate'>{
                      d.original.isEdit
                        ? <span className='icon ion-checkmark-round' style={{ fontSize: '18px' }} onClick={() => this.rateServiceSave(d.original, d.index * 2 + 1)} />
                        : <span className='icon ion-edit' style={{ fontSize: '18px' }} onClick={() => this.rateServiceEdit(d.index * 2 + 1)} />
                    }
                    </span>,
                    className: 'text',
                    label: '',
                    maxWidth: 100
                  }]
              }]} />
          </div>
        </div>
      </div>
      <div className='payroll-addons-container'>
        <SectionHeader title='Addon Rates' />
        <div className='inner-container'>
          <div className='left'>
            <CustomTable
              data={addons.filter((item, i) => { return i % 2 === 0 })}
              minRows={0}
              loading={customersLoading}
              showPagination={false}
              pageSize={addons.length / 2 + 1}
              className='-striped -highlight'
              style={{
                height: '300px' // This will force the table body to overflow and scroll, since there is not enough room
              }}
              columns={[{
                columns: [
                  {
                    accessor: 'name',
                    className: 'text strong',
                    label: 'ADDON'
                  },
                  {
                    Cell: (d) => <span className='rate'>$ &nbsp;{
                      d.original.isEdit
                        ? <ControlledPayRateInput
                          data={d}
                          handleEnterEscKey={this.handleEnterEscKey('addon', d.original, d.index * 2)}
                          handleInputChange={this.handleInputChange('addon', d.index * 2)}
                          value={d.original.addon_price} />
                        : parseFloat(d.original.addon_price).toFixed(2)}</span>,
                    id: 'amount',
                    className: 'text',
                    label: 'RATE',
                    maxWidth: 120
                  }, {
                    accessor: 'payroll_id',
                    Cell: (d) => <span className='rate'>{
                      d.original.isEdit
                        ? <span className='icon ion-checkmark-round' style={{ fontSize: '18px' }} onClick={() => this.rateAddonSave(d.original, d.index * 2)} />
                        : <span className='icon ion-edit' style={{ fontSize: '18px' }} onClick={() => this.rateAddonEdit(d.index * 2)} />
                    }
                    </span>,
                    className: 'text',
                    label: '',
                    maxWidth: 100
                  }]
              }]} />
          </div>
          <div className='right'>
            <CustomTable
              data={addons.filter((item, i) => { return i % 2 !== 0 })}
              minRows={0}
              loading={customersLoading}
              showPagination={false}
              pageSize={addons.length / 2 + 1}
              className='-striped -highlight'
              style={{
                height: '300px' // This will force the table body to overflow and scroll, since there is not enough room
              }}
              columns={[{
                columns: [
                  {
                    accessor: 'name',
                    className: 'text strong',
                    label: 'ADDON'
                  },
                  {
                    Cell: (d) => <span className='rate'>$ &nbsp;{
                      d.original.isEdit
                        ? <ControlledPayRateInput
                          data={d}
                          handleEnterEscKey={this.handleEnterEscKey('addon', d.original, d.index * 2 + 1)}
                          handleInputChange={this.handleInputChange('addon', d.index * 2 + 1)}
                          value={d.original.addon_price} />
                        : parseFloat(d.original.addon_price).toFixed(2)
                    }</span>,
                    id: 'amount',
                    className: 'text',
                    label: 'RATE',
                    maxWidth: 120
                  }, {
                    accessor: 'payroll_id',
                    Cell: (d) => <span className='rate'>{
                      d.original.isEdit
                        ? <span className='icon ion-checkmark-round' style={{ fontSize: '18px' }} onClick={() => this.rateAddonSave(d.original, d.index * 2 + 1)} />
                        : <span className='icon ion-edit' style={{ fontSize: '18px' }} onClick={() => this.rateAddonEdit(d.index * 2 + 1)} />
                    }</span>,
                    className: 'text',
                    label: '',
                    maxWidth: 100
                  }]
              }]} />
          </div>
        </div>
      </div>
    </div>
  }
}

CustomerRates.propTypes = {
  customerId: PropTypes.string.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = (state, props) => {
  const services = SortServices(customersController.selectCustomerServicesForSelectInput(props.customerId).map(s => ({ ...s, cost: s.customer_cost ? parseFloat(s.customer_cost).toFixed(2) : 0 })))
  const addons = SortCustomerAddonsByName(customersController.selectCustomerAddonsForSelectInput(props.customerId).map(s => ({ ...s, addon_price: s.addon_price ? parseFloat(s.addon_price).toFixed(2) : 0 })))

  return {
    services,
    addons,
    loading: state.customers.loading
  }
}

const ControlledPayRateInput = ({ data, handleEnterEscKey, handleInputChange, value }) => {
  const [updatedValue, setValue] = useState(value)
  const handleOnChange = e => {
    setValue(Number(e.target.value))
  }

  return <input
    type='number'
    className='payrateEdit'
    name={data.original.id}
    onKeyDown={handleEnterEscKey}
    onChange={handleOnChange}
    onBlur={handleInputChange}
    value={updatedValue} />
}

export default connect(mapStateToProps)(CustomerRates)
