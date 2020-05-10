// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, ScrollView } from 'react-native'

// import { Route, withRouter } from 'react-router-dom'

// Styles
import styles from './styles'

// Components
// import BankInformation from './BankInformation'
// import CustomerProfilePage from '../Customer/CustomerProfile'
// import StaffProfilePage from '../Walker/WalkerProfile'
// import NavTab from 'GlobalComponents/navigation/NavTab'
// import Passwords from './Passwords'
// import PaymentInformation from './PaymentInformation'
// import PaymentInfoPage from '../Customer/CustomerPaymentInfo'
// import Pets from '../Customer/CustomerPets'
import ProfileInformation from './ProfileInformation'
// import ProfilePic from './ProfilePic'
// import SectionBody from 'GlobalComponents/SectionBody'
// import QrCodes from './QrCodes'
import NavSelect from '../navigation/NavSelect'
// Controllers
import { appController, sessionController, walkersController, profileController } from '../../controllers'

// Actions
import customerProfileActions from '../../actions/customerProfile'
import paymentsActions from '../../actions/payments'
// import walkersActions from 'Actions/walkers'
// import walkersProfileActions from 'Actions/walkers/walkerProfile'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      payments: {},
      billing: {}
    }
    //  this.routes = this.resolveRoutes()
    // this.routerRoutes = this.routes.map((route, i) => <Route key={i} path={route.path} component={route.component} />)
  }

  componentDidMount () {
    appController.actions.openSideBar()
    if (this.props.selectUserType === 'customer') {
      this.props.customerProfileActions.getCustomers(this.props.selectUser.user_id)
      this.props.paymentsActions.fetchPayments(this.props.selectUser.user_id)
      this.props.paymentsActions.fetchBilling(this.props.selectUser.user_id)
    } else if (this.props.selectUserType === 'walker') {
      console.log('fetchWalkers')
      walkersController.actions.fetchWalkers()
    } else {
      profileController.actions.fetchBasicProfile()
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    this.setState({
      payments: nextProps.payments ? nextProps.payments.payments : null,
      billing: nextProps.payments ? nextProps.payments.billings : null
    })
  }

  onValueChange = (e) => {
    console.log(e)
  }
  /**
   * Resolve routes for the user type currently logged in
   * @return {Array} Array of routes
   */
  // resolveRoutes = () => {
  //   let {
  //     selectUserType
  //   } = this.props

  //   let {
  //     billing,
  //     payments
  //   } = this.state

  //   let customerProfile = {}
  //   if (this.props.customers) {
  //     customerProfile = this.props.customers.customers[0]
  //   }

  //   let walkerProfile = {}
  //   if (this.props.staffsData && this.props.staffsData.length > 0) {
  //     walkerProfile = this.props.staffsData[0]
  //   }

  //   const profileRoot = '/profile'
  //   let routes = [
  //     {
  //       component: ProfileInformation,
  //       show: selectUserType === 'licensee',
  //       index: true,
  //       path: `${profileRoot}/profile-information`,
  //       title: 'Profile'
  //     },
  //     {
  //       // component: () => {customerProfile && <div id='CustomerProfile'><CustomerProfilePage customerProfile={customerProfile} /></div>},
  //       component: () => { if (customerProfile) { return <div id='CustomerProfile'><CustomerProfilePage customerProfile={customerProfile} /></div> } else { return <span /> } },
  //       show: selectUserType === 'customer',
  //       index: true,
  //       path: `${profileRoot}/profile-information`,
  //       title: 'Profile'
  //     },
  //     {
  //       component: () => <div id='staffProfile'><StaffProfilePage isWalker walkerProfile={walkerProfile} /></div>,
  //       show: selectUserType === 'walker',
  //       index: true,
  //       path: `${profileRoot}/profile-information`,
  //       title: 'Profile'
  //     },
  //     {
  //       component: QrCodes,
  //       show: selectUserType === 'licensee',
  //       path: `${profileRoot}/qr-codes`,
  //       title: 'Order QR Codes'
  //     },
  //     {
  //       component: Passwords,
  //       show: selectUserType === 'licensee' || selectUserType === 'customer' || selectUserType === 'walker',
  //       path: `${profileRoot}/passwords`,
  //       title: 'Passwords'
  //     },
  //     {
  //       component: PaymentInformation,
  //       show: selectUserType === 'licensee',
  //       path: `${profileRoot}/payment-information`,
  //       title: 'Payment Info'
  //     },
  //     {
  //       component: BankInformation,
  //       show: selectUserType === 'licensee',
  //       path: `${profileRoot}/bank-information`,
  //       title: 'Bank Info'
  //     },
  //     {
  //       component: () => <div id='CustomerProfile'><PaymentInfoPage customer afterPaymentSubmit={this.afterPaymentSubmit} payments={payments} billing={billing} /></div>,
  //       show: selectUserType === 'customer',
  //       path: `${profileRoot}/payment-information`,
  //       title: 'Payment Info'
  //     },
  //     {
  //       component: () => <div id='CustomerProfile'><Pets customer={customerProfile} custid={this.props.selectUser.user_id} /></div>,
  //       show: selectUserType === 'customer',
  //       path: `${profileRoot}/pets`,
  //       title: 'Pets'
  //     },
  //     {
  //       component: ProfilePic,
  //       show: false && (selectUserType === 'licensee' || selectUserType === 'customer' || selectUserType === 'walker'),
  //       path: `${profileRoot}/profile-pic`,
  //       title: 'Profile Pic'
  //     }
  //   ]

  //   return routes.filter(r => r.show)
  // }

  render () {
    return <View style={styles.Profile}>
      <NavSelect routes={[]} />
      {/* <View style={styles.NavSelect}><CustomSelect options={[{value: 1, label: 'a1'}, {value: 2, label: 'a2'}]} /></View> */}
      <ScrollView style={styles.profile_inner}>
        <ProfileInformation />
        {/* <NavTab id='Profile-NavTab' routes={this.routes} />
        <SectionBody>
          {this.NavSelect}
        </SectionBody> */}
      </ScrollView>
    </View>
  }
}

const mapStateToProps = (state, ownProps) => {
  let mappedProps = {}

  const selectUserType = sessionController.selectUserType(state)
  const selectUser = sessionController.selectUser(state)

  switch (selectUserType) {
    case 'customer':
      mappedProps = {
        customers: state.customers,
        payments: state.payments,
        billing: state.payments.billings
      }
      break
    case 'walker':
      mappedProps = {
        staffsData: state.walkers.walkers
      }
      break
  }

  return {
    ...mappedProps,
    selectUserType,
    selectUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    customerProfileActions: bindActionCreators(customerProfileActions, dispatch),
    paymentsActions: bindActionCreators(paymentsActions, dispatch),
    // walkersActions: bindActionCreators(walkersActions, dispatch),
    // walkersProfileActions: bindActionCreators(walkersProfileActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
