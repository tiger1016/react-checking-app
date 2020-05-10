// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Controllers
import { appController } from 'Controllers/appController'
import { customersController } from 'Controllers/customersController'
import { sessionController } from 'Controllers/sessionController'

// Actions
import fetchCustomerInvoices from 'Actions/invoices/fetchCustomerInvoices'

// Components
import Button from 'GlobalComponents/Button'
import CustomerInvoices from './CustomerInvoices'
import CustomerPaymentInfo from './CustomerPaymentInfo'
import CustomerPets from './CustomerPets'
import CustomerProfile from './CustomerProfile'
import CustomerRates from './CustomerRates'
import CustomerRefundsAndCredits from './CustomerRefundsAndCredits'
import Loader from 'GlobalComponents/Loader'
import NavTab from 'GlobalComponents/navigation/NavTab'
import SectionBody from 'GlobalComponents/SectionBody'
import SectionHeader from 'GlobalComponents/SectionHeader'
import Switch from 'GlobalComponents/input/Switch'

// Styles
import './index.css'

class Customer extends React.Component {
  constructor (props) {
    super()
    this.state = {
      oldProps: {
        customerActive: props.customerActive,
        customerExists: props.customerExists,
        customerHasAddonRates: props.customerHasAddonRates,
        customerHasServiceTypesCosts: props.customerHasServiceTypesCosts,
        customerFirstName: props.customerFirstName,
        customerId: props.customerId,
        customerLastName: props.customerLastName,
        //  customersLoading: props.customersLoading,
        customersExists: props.customersExists,
        userType: props.userType
      }
    }
  }

  componentDidMount () {
    appController.actions.openSideBar()
    const {
      customerExists,
      customerHasAddonRates,
      customerHasServiceTypesCosts,
      customerId,
      customersExists,
      customersLoading,
      fetchCustomerInvoices,
      userType
    } = this.props

    if (!customersExists) customersController.actions.fetchCustomers()
    if (userType === 'licensee' || userType === 'full_scheduling_admin') {
      if (!customersLoading && customerExists && !customerHasAddonRates) {
        customersController.actions.fetchAddonsRates(customerId)
      }
      if (!customersLoading && customerExists && !customerHasServiceTypesCosts) {
        customersController.actions.fetchServiceRates(customerId)
      }
      if (!customersLoading && customerExists && customerId) {
        customersController.actions.fetchPaymentInformationOfCustomer(customerId)
      }
      fetchCustomerInvoices(customerId)
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.pathname !== nextProps.pathname) return true

    const newProps = {
      customerActive: nextProps.customerActive,
      customerExists: nextProps.customerExists,
      customerHasAddonRates: nextProps.customerHasAddonRates,
      customerHasServiceTypesCosts: nextProps.customerHasServiceTypesCosts,
      customerFirstName: nextProps.customerFirstName,
      customerId: nextProps.customerId,
      customerLastName: nextProps.customerLastName,
      //  customersLoading: nextProps.customersLoading,
      customersExists: nextProps.customersExists,
      userType: nextProps.userType
    }
    return !_.isEqual(newProps, nextState.oldProps)
  }
  componentWillMount () {
    appController.actions.openSideBar()
  }

  toggleCustomerStatus = () => {
    customersController.actions.toggleCustomerStatus(this.props.customerId, 0)
    appController.closeAlert()
  }

  toggleActionClicked = () => {
    const { customerActive, customerFirstName, customerLastName } = this.props
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        onConfirm: () => this.toggleCustomerStatus(),
        onCancel: () => appController.closeAlert(),
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        title: customerActive === 0 ? 'Activate Customer' : 'Deactivate Customer',
        text: customerActive === 0 ? 'Are you sure you want to Activate ' + customerFirstName + ' ' + customerLastName : 'Are you sure you want to Deactivate ' + customerFirstName + ' ' + customerLastName,
        type: 'warning'
      }
    })
  }

  rightHeaderComponent = () => <div className='headerRightComponent'>
    <div className='header-action-label'>{this.props.customerActive === 0 ? 'Inactive' : 'Active'}</div>
    <Switch checked={this.props.customerActive !== 0} name='active' noText onChange={this.toggleActionClicked} />
    <Link to={'/scheduler/month?customers[]=' + this.props.customerId}><Button textOnly iconOnly='ion-calendar' /></Link>
  </div>

  leftAction = () => <div className='go-back'>
    <Link to='/customers'><Button size={'large'} textOnly iconOnly='ion-arrow-left-c' /></Link>
  </div>

  home = () => <CustomerProfile customerId={this.props.customerId} />

  render () {
    const {
      customerFirstName,
      customerExists,
      customerId,
      customerLastName,
      customersLoading,
      pathname,
      userType
    } = this.props
    if (!customerExists && customersLoading) {
      return <div id='Customer' className='loading'>
        <Loader />
      </div>
    }

    if (!customerExists) return null

    const customerRoot = `/customer/${customerId}`

    let routes = (userType === 'licensee' || userType === 'full_scheduling_admin') ? [
      {
        component: CustomerProfile,
        index: true,
        path: `${customerRoot}/profile`,
        title: 'Customer Profile'
      },
      {
        component: CustomerPets,
        path: `${customerRoot}/pets`,
        // hide: hidePets,
        title: 'Pets'
      },
      {
        component: CustomerInvoices,
        path: `${customerRoot}/invoices`,
        title: 'Invoices'
      },
      {
        component: CustomerRates,
        path: `${customerRoot}/rates`,
        title: 'Rates'
      },
      {
        component: CustomerRefundsAndCredits,
        path: `${customerRoot}/refunds-and-credits`,
        title: 'Refunds & Credits'
      },
      {
        component: CustomerPaymentInfo,
        path: `${customerRoot}/payment-info`,
        title: 'Payment Info'
      }
    ] : [
      {
        component: CustomerProfile,
        index: true,
        path: `${customerRoot}/profile`,
        title: 'Customer Profile'
      },
      {
        component: CustomerPets,
        path: `${customerRoot}/pets`,
        // hide: hidePets,
        title: 'Pets'
      },
      {
        component: CustomerRefundsAndCredits,
        path: `${customerRoot}/refunds-and-credits`,
        title: 'Refunds & Credits',
        hide: userType !== 'scheduling_admin'
      }
    ]

    routes = routes.filter(f => !f.hide)

    return <div id='Customer'>
      <div className='customer-inner'>
        <SectionHeader
          leftAction={this.leftAction}
          title={`${customerFirstName} ${customerLastName}`}
          rightComponent={this.rightHeaderComponent()}
        />
        <NavTab id='Customer-NavTab' routes={routes} />
        <SectionBody noPadding={/profile$/.test(pathname) || /\d+\/*$/.test(pathname)}>
          <Route
            component={this.home}
            exact
            path={customerRoot}
          />
          {routes.map((route, i) => <Route
            key={i}
            path={route.path}
            component={() => <route.component
              customersLoading={customersLoading}
              customerId={customerId}
            />}
          />)}
        </SectionBody>
      </div>
    </div>
  }
}

Customer.propTypes = {
  customerActive: PropTypes.bool,
  customerExists: PropTypes.bool,
  customerHasAddonRates: PropTypes.bool,
  customerHasServiceTypesCosts: PropTypes.bool,
  customerFirstName: PropTypes.string,
  customerId: PropTypes.string,
  customerLastName: PropTypes.string,
  customersExists: PropTypes.bool,
  customersLoading: PropTypes.bool,
  pathname: PropTypes.string,
  userType: PropTypes.string
}

const mapStateToProps = (state, props) => {
  const { location: { pathname }, match } = props

  const customersExists = state.customers.customers.length > 0 && true
  let customerId = match.params.id
  const customer = customersExists ? state.customers.customers.find(c => `${c.user_id}` === `${customerId}`) : {}
  const customerActive = customer.active && true
  customerId = `${customer.user_id}`
  const customerFirstName = customer.first_name
  const customerLastName = customer.last_name
  const userType = sessionController.selectUserType(state)

  return {
    customerActive,
    customerExists: customer && true,
    customerHasAddonRates: customer.addons_customer && true,
    customerHasServiceTypesCosts: customer.service_types_cost && true,
    customerFirstName,
    customerId,
    customerLastName,
    customersExists,
    customersLoading: state.customers.loading,
    pathname,
    userType
  }
}

const mapDispatchToProps = {
  fetchCustomerInvoices
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customer))
