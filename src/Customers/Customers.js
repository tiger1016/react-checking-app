// Libraries
import React from 'react'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

// Config
import loadableConfig from 'Config/loadable.config'

// Utility
import { utility } from 'Utils'

// Styles

import './index.css'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'

// Controllers
import { appController, customersController, sessionController, petsController } from 'Controllers'

const LoadingComponent = () => <FullScreenTextOnly text='Loading' spinner />

const _loadableConfig = {
  ...loadableConfig,
  loading: LoadingComponent
}
const Button = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/Button')
})
const CustomTable = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/CustomTable')
})
const SearchInput = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/searchInput')
})
const SectionHeader = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/SectionHeader')
})
const PetsCell = Loadable({
  ..._loadableConfig,
  loader: () => import('./components/PetsCell')
})
const CenteredTextNotify = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/CenteredTextNotify')
})
const Switch = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/input/Switch')
})

class Customers extends React.Component {
  state = {
    activeFilter: true,
    modalIsOpen: false,
    searchValue: ''
  }

  componentWillMount () {
    const { customers } = this.props
    if (!customers.length) customersController.actions.fetchCustomers()
    if (!this.noPets() || this.noPets() === 0) { petsController.actions.fetchPets() }
  }

  componentDidMount () {
    appController.actions.openSideBar()
  }

  closeModal = () => this.setState({ modalIsOpen: false })

  getPetsOfACustomer = customerId => this.props.pets.filter(p => Number(p.customer_id) === Number(customerId))

  goToPet = (e, customerId, petName) => {
    e.stopPropagation()
    const { history } = this.props
    history.push('/customer/' + customerId + '/pets#' + petName.replace(' ', ''))
  }

  noInactiveCustomer = () => this.props.customers.filter(item => item.active === 0 && !item.toggled).length === 0

  noPets = () => this.props.pets.length

  openCustomerAddModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: true,
      modalIdentifier: appController.constants.ADD_CUSTOMER_MODAL_IDENTIFIER
    })
  }

  openModal = () => this.setState({ modalIsOpen: true })

  search = (value, customers) => {
    let options = {
      threshold: 0.2,
      keys: ['balance', 'first_name', 'last_name', 'phone_mobile', 'username', 'address', 'pets.name', 'email']
    }
    let fuse = new Fuse(customers, options)
    return fuse.search(value)
  }

  toggleActiveFilter = () => {
    if (this.noInactiveCustomer()) customersController.actions.fetchCustomers(true)
    this.setState({ activeFilter: !this.state.activeFilter })
  }

  render () {
    const {
      isLoading,
      history,
      userType
    } = this.props

    let {
      customers
    } = this.props

    if (!utility.isEmpty(this.state.searchValue)) customers = this.search(this.state.searchValue, customers)
    if (this.state.activeFilter) customers = customers.filter(item => item.active !== 0)
    if (!this.state.activeFilter) customers = customers.filter(item => item.active === 0)

    return <div id='Customers'>
      <SectionHeader
        leftComponent={isLoading ? null : <div className='toggle-active-customers'><div className='header-action-label'>{!this.state.activeFilter ? 'Inactive' : 'Active'}</div><Switch checked={this.state.activeFilter} name='active' noText onChange={this.toggleActiveFilter} /></div>}
        rightComponent={isLoading ? null : <Button onClick={this.openCustomerAddModal} text='CREATE CUSTOMER' round />}
        title='Customers'
      />

      {isLoading ? null : <SearchInput value={this.state.searchValue} onChange={e => this.setState({ searchValue: e.target.value })} />}

      {(isLoading || customers.length > 0) && <CustomTable
        data={customers}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: e => history.push(`/customer/${rowInfo.original.user_id}`)
        })}
        loading={isLoading}
        columns={[{
          columns: [
            {
              accessor: d => utility.customEllipsis(d.first_name + ' ' + d.last_name, 20),
              className: 'text strong',
              Cell: ({ value }) => <div className='cell'>
                {/* <div className='customer-picture-cell'>
                  <img className='img-circle' src={customerProfilePic} />
                </div> */}
                <span className='text strong'>{value}</span>
              </div>,
              id: 'customer',
              label: 'CUSTOMER',
              maxWidth: 160
            },
            {
              accessor: d => utility.customEllipsis(d.phone_mobile, 14),
              id: 'phone_mobile',
              className: 'text',
              label: 'PHONE',
              maxWidth: 110
            },
            {
              accessor: d => utility.customEllipsis(d.username, 36),
              id: 'email',
              className: 'text',
              label: 'EMAIL',
              maxWidth: 250
            },
            {
              accessor: d => utility.customEllipsis(d.address + ', ' + d.city + ', ' + d.state + ' ' + d.zip, 30),
              id: 'address',
              className: 'text',
              label: 'ADDRESS',
              maxWidth: 220
            },
            {
              accessor: d => utility.customEllipsis(utility.formatCurrency(d.total_unpaid - parseFloat(d.balance))),
              sortMethod: (a, b) => {
                const numberA = parseFloat(a.replace(/[$(),]/g, ''))
                const numberB = parseFloat(b.replace(/[$(),]/g, ''))
                if (numberA === numberB) return 0
                return numberA > numberB ? 1 : -1
              },
              id: 'balance',
              className: 'text',
              label: 'BALANCE',
              maxWidth: 120,
              show: userType !== 'scheduling_admin'
            },
            {
              Cell: (d) => <PetsCell
                customerId={`${d.original.user_id}`}
                customerPhotoId={`${d.original.customer_photo_id}`}
                goToPet={this.goToPet}
                pets={this.getPetsOfACustomer(d.original.user_id)}
              />,
              label: 'PETS',
              maxWidth: 140
            }
          ]
        }]}
      />}

      {!isLoading && customers.length === 0 && <div className='empty'>
        <CenteredTextNotify icon='ion-ios-checkmark' text={`No customers`} />
      </div>}
    </div>
  }
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  history: PropTypes.object,
  pets: PropTypes.array.isRequired,
  userType: PropTypes.string
}

const mapStateToProps = state => {
  const preCustomers = state.customers.customers.map(c => {
    const pets = state.pets.pets.filter(p => `${p.customer_id}` === `${c.user_id}`)
    c.pets = pets
    return c
  })
  const customers = _.sortBy(preCustomers, c => [c.last_name.toLowerCase(), c.first_name.toLowerCase()])
  return {
    customers,
    isLoading: state.customers.loading,
    pets: state.pets.pets,
    userType: sessionController.selectUserType(state)
  }
}

export default withRouter(connect(mapStateToProps)(Customers))
