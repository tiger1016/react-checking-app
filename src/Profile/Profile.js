// Libraries
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import { Route, withRouter } from 'react-router-dom'

// Config
import loadableConfig from 'Config/loadable.config'

// Styles
import './index.css'

// Controllers
import { appController, sessionController, walkersController } from 'Controllers'

// Actions
import fetchCustomerProfile from 'Actions/customerProfile/fetchCustomerProfile'
import fetchBilling from 'Actions/payments/fetchBilling'
import fetchPayments from 'Actions/payments/fetchPayments'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'
const LoadingComponent = props => <FullScreenTextOnly text='Loading' spinner />
const _loadableConfig = {
  ...loadableConfig,
  loading: LoadingComponent
}
const BankInformation = Loadable({
  ..._loadableConfig,
  loader: () => import('./BankInformation')
})
const CustomerProfile = Loadable({
  ..._loadableConfig,
  loader: () => import('../Customer/CustomerProfile')
})
const StaffProfilePage = Loadable({
  ..._loadableConfig,
  loader: () => import('../Walker/WalkerProfile')
})
const NavTab = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/navigation/NavTab')
})
const Passwords = Loadable({
  ..._loadableConfig,
  loader: () => import('./Passwords')
})
const PaymentInformation = Loadable({
  ..._loadableConfig,
  loader: () => import('./PaymentInformation')
})
const CustomerPaymentInfo = Loadable({
  ..._loadableConfig,
  loader: () => import('../Customer/CustomerPaymentInfo')
})
const Pets = Loadable({
  ..._loadableConfig,
  loader: () => import('../Customer/CustomerPets')
})
const ProfileInformation = Loadable({
  ..._loadableConfig,
  loader: () => import('./ProfileInformation')
})
const ProfilePic = Loadable({
  ..._loadableConfig,
  loader: () => import('./ProfilePic')
})
const SectionBody = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/SectionBody')
})
const QrCodes = Loadable({
  ..._loadableConfig,
  loader: () => import('./QrCodes')
})

class Profile extends React.PureComponent {
  componentDidMount () {
    const {
      fetchCustomerProfile,
      fetchBilling,
      fetchPayments,
      userType,
      userId,
      staffsData
    } = this.props
    appController.actions.openSideBar()
    if (userType === 'customer') {
      fetchBilling(userId)
      fetchCustomerProfile(userId)
      fetchPayments(userId)
    } else if (userType === 'walker' || userType === 'scheduling_admin' || userType === 'full_scheduling_admin') {
      if (!staffsData || staffsData.length < 1) {
        walkersController.actions.fetchWalkers()
      }
    }
  }

  resolveRoutes = () => {
    const {
      staffsData,
      userType,
      userId
    } = this.props

    let walkerProfile = {}
    if (staffsData && staffsData.length > 0) {
      walkerProfile = staffsData[0]
    }

    const profileRoot = '/profile'
    let routes = [
      {
        component: ProfileInformation,
        show: true,
        index: userType === 'licensee',
        path: `${profileRoot}/profile-information`,
        title: userType === 'full_scheduling_admin' ? 'Licensee Profile' : 'Profile'
      },
      {
        component: () => {
          return <div id='CustomerProfile'>
            <CustomerProfile customerId={userId} />
          </div>
        },
        show: userType === 'customer',
        index: userType === 'customer',
        path: `${profileRoot}/`,
        title: 'Profile'
      },
      {
        component: () => <div id='staffProfile'>
          <StaffProfilePage isWalker walkerId={walkerProfile.user_id} />
        </div>,
        show: (userType === 'walker' || userType === 'scheduling_admin' || userType === 'full_scheduling_admin') && walkerProfile,
        index: userType === 'walker' || userType === 'scheduling_admin' || userType === 'full_scheduling_admin',
        path: `${profileRoot}/`,
        title: 'Profile'
      },
      {
        component: QrCodes,
        show: userType === 'licensee',
        path: `${profileRoot}/qr-codes`,
        title: 'Order QR Codes'
      },
      {
        component: Passwords,
        show: userType === 'licensee' || userType === 'customer' || userType === 'walker' || userType === 'scheduling_admin' || userType === 'full_scheduling_admin',
        path: `${profileRoot}/passwords`,
        title: 'Passwords'
      },
      {
        component: PaymentInformation,
        show: userType === 'licensee',
        path: `${profileRoot}/payment-information`,
        title: 'Payment Info'
      },
      {
        component: BankInformation,
        show: userType === 'licensee',
        path: `${profileRoot}/bank-information`,
        title: 'Bank Info'
      },
      {
        component: () => <div id='CustomerProfile'>
          <CustomerPaymentInfo customerId={userId} />
        </div>,
        show: userType === 'customer',
        path: `${profileRoot}/payment-information`,
        title: 'Payment Info'
      },
      {
        component: () => <div id='CustomerProfile'>
          <Pets customerId={userId} />
        </div>,
        show: userType === 'customer',
        path: `${profileRoot}/pets`,
        title: 'Pets'
      },
      {
        component: ProfilePic,
        show: false && (userType === 'licensee' || userType === 'customer' || userType === 'walker' || userType === 'scheduling_admin' || userType === 'full_scheduling_admin'),
        path: `${profileRoot}/profile-pic`,
        title: 'Profile Pic'
      }
    ]

    return routes.filter(r => r.show)
  }

  render () {
    const routes = this.resolveRoutes()
    const routerRoutes = routes.map((route, i) => <Route exact key={i} path={route.path} component={route.component} />)
    return <div id='Profile'>
      <div className='profile-inner'>
        <NavTab id='Profile-NavTab' routes={routes} />
        <SectionBody>
          {routerRoutes}
        </SectionBody>
      </div>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  let mappedProps = {}

  const userType = sessionController.selectUserType(state)
  const selectUser = sessionController.selectUser(state)
  const { user_id: userId } = selectUser

  switch (userType) {
    case 'walker':
      mappedProps = {
        staffsData: state.walkers.walkers
      }
      break
    case 'scheduling_admin':
      mappedProps = {
        staffsData: state.walkers.walkers.filter(w => w.active && w.admin === 1)
      }
      break
    case 'full_scheduling_admin':
      mappedProps = {
        staffsData: state.walkers.walkers.filter(w => w.active && w.admin_full === 1)
      }
      break
  }

  return {
    ...mappedProps,
    userId,
    userType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCustomerProfile: bindActionCreators(fetchCustomerProfile, dispatch),
    fetchBilling: bindActionCreators(fetchBilling, dispatch),
    fetchPayments: bindActionCreators(fetchPayments, dispatch),
    dispatch
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
