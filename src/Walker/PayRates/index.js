// Libraries
import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

// Controller
import { walkersController } from 'Controllers'

// Components
import CustomTable from 'GlobalComponents/CustomTable'
import DiscountTypeSelect from 'GlobalComponents/input/DiscountTypeSelect'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Styles
import './index.css'

class PayRates extends React.Component {
  constructor (props) {
    super(props)
    this.state = { payrates: {}, walkerPayrate: this.editOption(this.props.payrates) }
    if (this.state.walkerPayrate && this.state.walkerPayrate.service_types_cost && this.state.walkerPayrate.addons) {
      this.state.walkerPayrate.service_types_cost.forEach(item => { item.cost = parseFloat(item.cost).toFixed(2) })
      this.state.walkerPayrate.addons.forEach(item => { item.addon_price = parseFloat(item.addon_price).toFixed(2) })
    }
  }

  componentWillMount () {
    const { payrates, walkerId, walkersLoading } = this.props
    if (!payrates && !walkersLoading) {
      walkersController.actions.fetchWalkerPayRate(walkerId)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { payrates } = this.props
    if (!_.isEqual(payrates, nextProps.payrates)) {
      const walkerPayrate = this.editOption(nextProps.payrates)
      walkerPayrate.service_types_cost.forEach(item => { item.cost = parseFloat(item.cost).toFixed(2) })
      walkerPayrate.addons.forEach(item => { item.addon_price = parseFloat(item.addon_price).toFixed(2) })
      this.setState({ walkerPayrate })
    }
  }

  editOption (data) {
    if (data) {
      data.service_types_cost = data.service_types_cost.map(item => {
        if (item) {
          item.oldValue = item.cost
          item.isEdit = false
          item.old_pay_type = 'dollar'
          item.pay_type = 'dollar'
        }
        return item
      })
      if (data.services) {
        data.services.forEach(service => {
          const index = data.service_types_cost.findIndex(
            item => Number(item.id) === Number(service.billing_price_group_id)
          )
          if (index >= 0) {
            data.service_types_cost[index].oldValue = service.cost
            data.service_types_cost[index].cost = service.cost
            data.service_types_cost[index].pay_type = service.dollar_percent || 'dollar'
            data.service_types_cost[index].old_pay_type = service.dollar_percent || 'dollar'
          }
        })
      }
      data.addons = data.addons.map(item => {
        if (item) {
          item.oldValue = item.addon_price
          item.isEdit = false
          item.old_pay_type = 'dollar'
          item.pay_type = 'dollar'
        }
        return item
      })
      if (data.addons_walker) {
        data.addons_walker.forEach(addon => {
          const index = data.addons.findIndex(item => Number(item.id) === Number(addon.addon_id))
          if (index >= 0) {
            data.addons[index].oldValue = addon.addon_price
            data.addons[index].addon_price = addon.addon_price
            data.addons[index].pay_type = addon.dollar_percent || 'dollar'
            data.addons[index].old_pay_type = addon.dollar_percent || 'dollar'
          }
        })
      }
      return data
    }
    return data
  }

  handleInputChange = (item, type, payrate) => {
    const { walkerPayrate } = this.state
    if (type === 'service') {
      const index = walkerPayrate.addons.indexOf(payrate)
      walkerPayrate.addons[index].addon_price = item.target.value
    } else if (type === 'cost') {
      const index = walkerPayrate.service_types_cost.indexOf(payrate)
      walkerPayrate.service_types_cost[index].cost = item.target.value
    } else if (type === 'pay_type_service') {
      const index = walkerPayrate.addons.indexOf(payrate)
      walkerPayrate.addons[index].pay_type = item.value
    } else if (type === 'pay_type_cost') {
      const index = walkerPayrate.service_types_cost.indexOf(payrate)
      walkerPayrate.service_types_cost[index].pay_type = item.value
    }
    this.forceUpdate()
  }

  rateCostEdit = (payrate) => {
    const { walkerPayrate } = this.state
    const index = walkerPayrate.addons.indexOf(payrate)
    walkerPayrate.addons[index].isEdit = true
    this.forceUpdate()
  }

  rateServiceEdit = (payrate) => {
    const { walkerPayrate } = this.state
    const index = walkerPayrate.service_types_cost.indexOf(payrate)
    walkerPayrate.service_types_cost[index].isEdit = true
    this.forceUpdate()
  }

  rateCostSave = (payrate) => {
    const { walkerId } = this.props
    const { walkerPayrate } = this.state
    const index = walkerPayrate.addons.indexOf(payrate)
    walkerPayrate.addons[index].isEdit = false
    if (Number(walkerPayrate.addons[index].oldValue) !== Number(payrate.addon_price) || walkerPayrate.addons[index].old_pay_type !== payrate.pay_type) {
      const reqPayrate = {}
      reqPayrate[payrate.id] = payrate.addon_price
      reqPayrate['pay_type'] = payrate.pay_type
      walkersController.actions.editWalkerPayRate(walkerId, 'addons', reqPayrate)
    }
    this.forceUpdate()
  }

  rateServiceSave = (payrate) => {
    const { walkerId } = this.props
    const { walkerPayrate } = this.state
    const index = walkerPayrate.service_types_cost.indexOf(payrate)
    walkerPayrate.service_types_cost[index].isEdit = false
    if (Number(walkerPayrate.service_types_cost[index].oldValue) !== Number(payrate.cost) ||
      walkerPayrate.service_types_cost[index].old_pay_type !== payrate.pay_type) {
      const reqPayrate = {}
      reqPayrate[payrate.id] = payrate.cost
      reqPayrate['pay_type'] = payrate.pay_type
      walkersController.actions.editWalkerPayRate(walkerId, 'services', reqPayrate)
    }
    this.forceUpdate()
  }

  discountTypeSelectOnOpen = (cell) => {
    const cells = document.querySelectorAll('.ReactTable .rt-tbody .rt-tr .rt-td:nth-child(2)')
    cells.forEach(c => {
      c.style.height = '110px'
      c.style.verticalAlign = 'top'
      c.style.alignItems = 'flex-start'
      c.style.paddingTop = '10px'
    })
  }

  discountTypeSelectOnClose = () => {
    const cells = document.querySelectorAll('.ReactTable .rt-tbody .rt-tr .rt-td:nth-child(2)')
    cells.forEach(c => {
      c.style.height = null
      c.style.verticalAlign = null
      c.style.alignItems = null
      c.style.paddingTop = null
    })
  }

  render () {
    const { walkersLoading } = this.props
    const { walkerPayrate } = this.state
    let scope = this
    let services = []
    let addons = []
    if (walkerPayrate) {
      if (walkerPayrate.service_types_cost) { services = walkerPayrate.service_types_cost }
      if (walkerPayrate.addons) { addons = walkerPayrate.addons }
    }

    return (
      <div id='WalkerPayrate'>
        <div className='payroll-services-container'>
          <SectionHeader title='Service Rates' />
          <div className='inner-container'>
            <div className='left'>
              <CustomTable
                data={services.filter((item, i) => i % 2 === 0)}
                minRows={0}
                loading={walkersLoading}
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
                      accessor: 'dropdown_description',
                      className: 'text strong',
                      label: 'SERVICE'
                    },
                    {
                      Cell: (d) => <span className='rate'>{d.original.isEdit ? <DiscountTypeSelect
                        onChange={(e) => scope.handleInputChange(e, 'pay_type_cost', d.original)}
                        onOpen={d => this.discountTypeSelectOnOpen(d)}
                        onClose={() => this.discountTypeSelectOnClose(d)}
                        value={d.original.pay_type}
                      /> : d.original.pay_type === 'percent' ? '%' : '$'} &nbsp;{d.original.isEdit ? <input
                        type='number'
                        className='payrateEdit'
                        name={d.original.id}
                        onChange={(e) => scope.handleInputChange(e, 'cost', d.original)}
                        value={d.original.cost || ''}
                      /> : parseFloat(d.original.cost || 0).toFixed(2)}</span>,
                      id: 'amount',
                      className: 'text',
                      label: 'RATE',
                      maxWidth: 160
                    },
                    {
                      accessor: 'action',
                      Cell: (d) => <span className='rate'>
                        {!d.original.isEdit && <span className='icon ion-edit'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateServiceEdit(d.original)}
                        />}
                        {d.original.isEdit && <span className='icon ion-checkmark-round'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateServiceSave(d.original)}
                        />}
                      </span>,
                      className: 'text',
                      label: '',
                      maxWidth: 80
                    }
                  ]
                }]}
              />
            </div>
            <div className='right'>
              <CustomTable
                data={services.filter((item, i) => { return i % 2 !== 0 })}
                minRows={0}
                loading={walkersLoading}
                showPagination={false}
                pageSize={services.length / 2 + 1}
                className='-striped -highlight'
                style={{
                  height: '300px' // This will force the table body to overflow and scroll, since there is not enough room
                }}
                columns={[{
                  columns: [
                    {
                      accessor: 'dropdown_description',
                      className: 'text strong',
                      label: 'SERVICE'
                    },
                    {
                      Cell: (d) => <span className='rate'>{d.original.isEdit
                        ? <DiscountTypeSelect onChange={(e) => scope.handleInputChange(e, 'pay_type_cost', d.original)} onOpen={d => this.discountTypeSelectOnOpen(d)} onClose={() => this.discountTypeSelectOnClose(d)} value={d.original.pay_type} />
                        : d.original.pay_type === 'percent' ? '%' : '$'} &nbsp;{d.original.isEdit ? <input type='number' className='payrateEdit' name={d.original.id} onChange={(e) => scope.handleInputChange(e, 'cost', d.original)} value={d.original.cost || 0} /> : parseFloat(d.original.cost || 0).toFixed(2)}</span>,
                      id: 'amount',
                      className: 'text',
                      label: 'RATE',
                      maxWidth: 160
                    }, {
                      accessor: 'action',
                      Cell: (d) => <span className='rate'>
                        {!d.original.isEdit && <span className='icon ion-edit'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateServiceEdit(d.original)}
                        />}
                        {d.original.isEdit && <span className='icon ion-checkmark-round'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateServiceSave(d.original)}
                        />}
                      </span>,
                      className: 'text',
                      label: '',
                      maxWidth: 80
                    }
                  ]
                }]}
              />
            </div>
          </div>
        </div>
        <div className='payroll-addons-container'>
          <SectionHeader title='Addon Rates' />
          <div className='inner-container'>
            <div className='left'>
              <CustomTable
                data={addons.filter((item, i) => i % 2 === 0)}
                minRows={0}
                loading={walkersLoading}
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
                      Cell: (d) => <span className='rate'>{d.original.isEdit
                        ? <DiscountTypeSelect
                          onChange={(e) => scope.handleInputChange(e, 'pay_type_service', d.original)}
                          onOpen={d => this.discountTypeSelectOnOpen(d)}
                          onClose={() => this.discountTypeSelectOnClose(d)}
                          value={d.original.pay_type}
                        />
                        : d.original.pay_type === 'percent' ? '%' : '$'} &nbsp;{d.original.isEdit
                        ? <input
                          type='number'
                          className='payrateEdit'
                          name={d.original.id}
                          onChange={(e) => scope.handleInputChange(e, 'service', d.original)}
                          value={d.original.addon_price || 0}
                        /> : parseFloat(d.original.addon_price || 0).toFixed(2)}
                      </span>,
                      id: 'amount',
                      className: 'text',
                      label: 'RATE',
                      maxWidth: 160
                    },
                    {
                      accessor: 'payroll_id',
                      Cell: (d) => <span className='rate'>
                        {!d.original.isEdit && <span className='icon ion-edit'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateCostEdit(d.original)}
                        />}
                        {d.original.isEdit && <span className='icon ion-checkmark-round'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateCostSave(d.original)}
                        />}
                      </span>,
                      className: 'text',
                      label: '',
                      maxWidth: 80
                    }
                  ]
                }]}
              />
            </div>
            <div className='right'>
              <CustomTable
                data={addons.filter((item, i) => i % 2 !== 0)}
                minRows={0}
                loading={walkersLoading}
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
                      Cell: (d) => <span className='rate'>{d.original.isEdit
                        ? <DiscountTypeSelect
                          onChange={e => scope.handleInputChange(e, 'pay_type_service', d.original)}
                          onOpen={d => this.discountTypeSelectOnOpen(d)}
                          onClose={() => this.discountTypeSelectOnClose(d)}
                          value={d.original.pay_type}
                        /> : d.original.pay_type === 'percent' ? '%' : '$'} &nbsp;{d.original.isEdit
                        ? <input type='number'
                          className='payrateEdit'
                          name={d.original.id}
                          onChange={(e) => scope.handleInputChange(e, 'service', d.original)}
                          value={d.original.addon_price || 0}
                        /> : parseFloat(d.original.addon_price || 0).toFixed(2)}</span>,
                      id: 'amount',
                      className: 'text',
                      label: 'RATE',
                      maxWidth: 160
                    },
                    {
                      accessor: 'payroll_id',
                      Cell: (d) => <span className='rate'>
                        {!d.original.isEdit && <span className='icon ion-edit'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateCostEdit(d.original)}
                        />}
                        {d.original.isEdit && <span className='icon ion-checkmark-round'
                          style={{ fontSize: '18px' }}
                          onClick={() => scope.rateCostSave(d.original)}
                        />}
                      </span>,
                      className: 'text',
                      label: '',
                      maxWidth: 80
                    }
                  ]
                }]}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { walkerId } = props
  const walkersExists = !!state.walkers.walkers.length
  const walker = walkersExists ? state.walkers.walkers.find(c => Number(c.user_id) === Number(walkerId)) : null

  return {
    payrates: walker.payrates,
    walkersLoading: state.walkers.loading
  }
}

export default connect(mapStateToProps)(PayRates)
