// Libraries
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment-timezone'

// Components
import AddContactInfo from './component/addContactInfo'
import AddServicePrices from './component/addServicePrices'
import AddPaymentInfo from './component/addPaymentInfo'
import AddPetInfo from './component/addPetInfo'
import AddProfile from './component/addProfile'
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import { Tab } from 'GlobalComponents/TabComponent/Tab'

// Actions
import fetchAddons from 'Actions/addons/fetchAddons'
import customerActions from 'Actions/customers'
import customerProfileActions from 'Actions/customerProfile'
import paymentsActions from 'Actions/payments'
import petActions from 'Actions/pets'
import ratesActions from 'Actions/rates'
import servicesActions from 'Actions/services'
import walkersActions from 'Actions/walkers'

// Controllers
import { appController, petsController, servicesController, sessionController } from 'Controllers'

// Styles
import './index.css'

const contactVM = {
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phone_mobile: '',
  phone_home: '',
  phone_work: '',
  first_name_secondary: '',
  last_name_secondary: '',
  email_secondary: '',
  phone_work_secondary: '',
  phone_mobile_secondary: '',
  phone_home_secondary: ''
}
const contactValidation = {
  first_name: ['required'],
  last_name: ['required'],
  email: ['required', 'email'],
  phone_mobile: ['required', 'phone'],
  address: ['required'],
  city: ['required'],
  state: ['required'],
  zip: ['required', 'zip'],
  email_secondary: ['email']
}
const profileVM = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  signUpDate: moment(),
  qr: '1',
  qr_code_location: '',
  walker: 'paid',
  type: 'CASH / CHECK',
  invoice_terms: 'Upon Receipt',
  timing: 'BILL CUSTOMER AFTER SERVICE',
  billing_frequency: 'WEEKLY',
  services: [],
  defaultService: '(WTD)Vacation Care (half day)',
  photo: '//testdash.petchecktechnology.com/assets/img/photos/no_image_lg.png'
}
const profileValidation = {
  password: ['required'],
  password2: ['password2']
}
const paymentVM = {
  payment_type: 'cc',
  invoice_terms: 'upon_receipt',
  billing_timing: 'arrears',
  billing_frequency: 'weekly',
  first_name_billing: '',
  last_name_billing: '',
  address_billing: '',
  address2_billing: '',
  city_billing: '',
  zip_billing: '',
  state_billing: '',
  card_type: '',
  exp_year: '',
  exp_month: '',
  card_number: '',
  cvv: '',
  billing_date: '01'
}
const paymentValidation = {
  password: ['required'],
  password2: ['required', 'password2']
}
const AddPetVM = function () {
  this.type = ''
  this.name = ''
  this.color = ''
  this.birthday = ''
  this.rabies_expiration = ''
  this.vet_address = ''
  this.vet_address2 = ''
  this.vet_name = ''
  this.vet_city = ''
  this.vet_state = ''
  this.vet_zip = ''
  this.animal_hospital = ''
  this.vet_phone = ''
  this.medicine_info = ''
  this.collar_info = ''
  this.notes = ''
  this.weight = ''
  this.gender = ''
  this.photo = ''
}

const addPetValidation = {
  name: ['required'],
  type: ['required']
  // photo: ['required']
}

class AddCustomer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contactInfo: contactVM,
      contactInfoValid: contactValidation,
      contactInfoUntoched: true,
      profileInfo: profileVM,
      profileInfoValid: profileValidation,
      profileInfoUntoched: true,
      addPet: [new AddPetVM()],
      addPetValid: addPetValidation,
      addPetUntoched: true,
      paymentInfo: paymentVM,
      paymentInfoValid: paymentValidation,
      paymentInfoUntoched: true,
      services: [],
      addons: [],
      isContactInfoValid: true,
      isProfileInfoValid: true,
      isAddPetValid: true,
      isPaymentInfoValid: true,
      currentTab: 0
    }
  }
  componentWillReceiveProps (nextprops) {
    if (this.state.services.length === 0) {
      this.setState({
        services: nextprops.services.services ? nextprops.services.services.map(item => { item.customer_cost = parseFloat(item.cost || 0).toFixed(2); return item }) : []
      })
    }
    if (this.state.addons.length === 0) {
      this.setState({
        addons: nextprops.addons.addons ? nextprops.addons.addons.map(item => { item.customer_addons_cost = parseFloat(item.addon_price || 0).toFixed(2); return item }) : []
      })
    }
  }
  componentWillMount () {
    servicesController.fetchServices()
    this.props.fetchAddons()
    petsController.actions.fetchPetBreeds()
  }

  createContactInfo = () => {
    this.setState({ paymentInfoUntoched: false })
    var date = moment(this.state.profileInfo.signUpDate).format('YYYY-MM-DD')
    var object = {
      first_name: this.state.contactInfo.first_name,
      last_name: this.state.contactInfo.last_name,
      email: this.state.contactInfo.email,
      password: this.state.profileInfo.password,
      invoice_terms: this.state.profileInfo.invoice_terms,
      billing_frequency: this.state.profileInfo.billing_frequency,
      billing_group_default: 100,
      default_walker: this.state.profileInfo.walker,
      sign_up_date: date,
      phone_mobile: this.state.contactInfo.phone_mobile,
      phone_work: this.state.contactInfo.phone_work,
      phone_home: this.state.contactInfo.phone_home,
      address: this.state.contactInfo.address,
      address2: this.state.contactInfo.address2,
      city: this.state.contactInfo.city,
      state: this.state.contactInfo.state,
      zip: this.state.contactInfo.zip,
      email_secondary: this.state.contactInfo.email_secondary,
      phone_mobile_secondary: this.state.contactInfo.phone_mobile_secondary,
      phone_work_secondary: this.state.contactInfo.phone_work_secondary,
      phone_home_secondary: this.state.contactInfo.phone_home_secondary,
      email_emergency: this.state.contactInfo.email_emergency,
      phone_emergency: this.state.contactInfo.phone_emergency,
      first_name_emergency: this.state.contactInfo.first_name_emergency,
      last_name_emergency: this.state.contactInfo.last_name_emergency,
      first_name_secondary: this.state.contactInfo.first_name_secondary,
      last_name_secondary: this.state.contactInfo.last_name_secondary,
      referred_from: this.state.profileInfo.referred_from,
      notes: this.state.profileInfo.notes,
      key_info: this.state.profileInfo.key_info,
      house_alarm_code: this.state.profileInfo.house_alarm_code,
      qr_code: this.state.profileInfo.qr_code,
      qr_code_location: this.state.profileInfo.qr_code_location,
      default_service: this.state.profileInfo.defaultService
    }
    this.props.customerProfileActions.createCustomer(object, this.getCustomercallback)
  }

  getCustomercallback = (err, data) => {
    if (!err) {
      appController.closeModal()
      this.setState({ customerId: data.user_id })
      if (this.props.userType === 'scheduling_admin') {
        this.createPetsInfo(data.user_id)
        return
      }
      this.createPetsInfo(data.user_id)
      this.createPayment(data.user_id)
      this.createSetPrice(data.user_id)
    }
  }

  createPayment = (customerId) => {
    if (this.state.paymentInfo.payment_type === 'cash_check') {
      var cash = {
        'payment_type': this.state.paymentInfo.payment_type,
        'invoice_terms': this.state.paymentInfo.invoice_terms,
        'billing_timing': this.state.paymentInfo.billing_timing,
        'billing_date': this.state.paymentInfo.billing_date,
        'billing_frequency': this.state.paymentInfo.billing_frequency,
        'first_name_billing': this.state.paymentInfo.first_name_billing,
        'last_name_billing': this.state.paymentInfo.last_name_billing,
        'address_billing': this.state.paymentInfo.address_billing,
        'address2_billing': this.state.paymentInfo.address2_billing,
        'state_billing': this.state.paymentInfo.state_billing,
        'city_billing': this.state.paymentInfo.city_billing,
        'zip_billing': this.state.paymentInfo.zip_billing,
        'card_type': this.state.paymentInfo.card_type,
        'exp_year': this.state.paymentInfo.exp_year,
        'exp_month': this.state.paymentInfo.exp_month,
        'card_number': this.state.paymentInfo.card_number,
        'cvv': this.state.paymentInfo.cvv
      }
      this.props.paymentsActions.updatePayments(customerId, cash)
    } else if (this.state.paymentInfo.card_number && this.state.paymentInfo.cvv && this.state.paymentInfo.exp_month && this.state.paymentInfo.exp_year) {
      this.props.paymentsActions.updatePayments(customerId, this.state.paymentInfo)
    }
  }

  createSetPrice = (customerId) => {
    var itemsList = {}
    this.state.services.forEach(function (entry) {
      var serviceId = entry.id
      var cost = entry.customer_cost
      itemsList[serviceId] = cost
    })
    this.props.customerActions.updateServiceRates(customerId, itemsList)
    var items = {}
    this.state.addons.forEach(function (entry1) {
      var addonsId = entry1.id
      var addonsCost = entry1.customer_addons_cost
      items[addonsId] = addonsCost
    })
    this.props.customerActions.updateAddonRates(customerId, items)
  }

  createPetsInfo = (customerId) => {
    this.state.addPet.map((item) => {
      this.props.petActions.createPets(customerId, item)
    })
  }
  addAntherPet = () => {
    let tempInfo = this.state.addPet
    tempInfo.push(new AddPetVM())
    console.log('addAntherPet', tempInfo)
    this.setState({ addPet: tempInfo })
  }
  setContactInfo = (type, e, key) => {
    let tempInfo = { ...this.state.contactInfo }

    switch (type) {
      case 'input':
        tempInfo[key] = e.target.value
        break
      case 'date':
        tempInfo[key] = e.format('YYYY-MM-DD')
        break
      case 'select':
        tempInfo[key] = e.value
        break
      case 'file':
        tempInfo[key] = e
        break
    }

    this.setState({ contactInfo: tempInfo })
  }
  setProfileInfo = (type, e, key) => {
    let tempInfo = { ...this.state.profileInfo }
    switch (type) {
      case 'input':
        tempInfo[key] = e.target.value
        break
      case 'date':
        tempInfo[key] = e.format('YYYY-MM-DD')
        break
      case 'select':
        tempInfo[key] = e.value
        break
      case 'file':
        tempInfo[key] = e
        break
    }
    this.setState({ profileInfo: tempInfo })
  }
  setAddPet = (type, e, key, i) => {
    let tempInfo = [...this.state.addPet]
    switch (type) {
      case 'input':
        tempInfo[i][key] = e.target.value
        break
      case 'date':
        tempInfo[i][key] = e.format('YYYY-MM-DD')
        break
      case 'select':
        tempInfo[i][key] = e.value
        break
      case 'file':
        if (e && e.length > 0) { tempInfo[i][key] = e[0] } else {
          delete tempInfo[i][key]
        }
        break
    }
    this.setState({ addPet: tempInfo })
  }
  setPaymentInfo = (type, e, key) => {
    let tempInfo = { ...this.state.paymentInfo }
    switch (type) {
      case 'input':
        tempInfo[key] = e.target.value
        break
      case 'date':
        tempInfo[key] = e.format('YYYY-MM-DD')
        break
      case 'select':
        tempInfo[key] = e.value
        break
      case 'file':
        tempInfo[key] = e
        break
    }
    this.setState({ paymentInfo: tempInfo })
  }
  setPrice = (array, type) => {
    if (type === 'services') {
      this.setState({ services: array })
    } else if (type === 'addons') {
      this.setState({ addons: array })
    }
  }

  isFieldValid = (modal, field) => {
    if (field === 'password2') {
      if (this.state[modal]['password2'] === this.state[modal]['password']) {
        return ''
      } else { return 'errBorder' }
    }
    if (!this.state[modal + 'Untoched'] && this.state[modal + 'Valid'][field]) {
      let isValid = true
      let self = this
      this.state[modal + 'Valid'][field].map(function (item) {
        switch (item) {
          case 'required':
            if (self.state[modal][field] && self.state[modal][field] != null && self.state[modal][field] !== undefined && self.state[modal][field] !== '') {
              isValid = true
            } else { isValid = false }
            break
          case 'password2':
            if (self.state[modal]['password2'] === self.state[modal]['password']) {
              isValid = true
            } else { isValid = false }
            break
          default:
        }
      })
      if (isValid) {
        return ''
      } else {
        return 'errBorder'
      }
    } else {
      return ''
    }
  }
  isPetFieldValid = (modal, field, i) => {
    if (!this.state[modal + 'Untoched'] && this.state[modal + 'Valid'][field]) {
      let isValid = true
      let self = this
      this.state[modal + 'Valid'][field].map(function (item) {
        switch (item) {
          case 'required':
            if (self.state[modal][i][field] && self.state[modal][i][field] != null && self.state[modal][i][field] !== undefined && self.state[modal][i][field] !== '') {
              isValid = true
            } else { isValid = false }
            break
          case 'email':
            if (self.state[modal][i][field] && self.state[modal][i][field] != null && self.state[modal][i][field] !== undefined && self.state[modal][i][field] !== '') {
              let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              isValid = re.test(self.state[modal][i][field])
            }
            break
          case 'phone':
            if (self.state[modal][i][field].length === 12) {
              isValid = true
            } else { isValid = false }
            break
          case 'zip':
            if (self.state[modal][i][field].length === 5) {
              isValid = true
            } else { isValid = false }
            break
          default:
        }
      })
      if (isValid) {
        return ''
      } else {
        return 'errBorder'
      }
    } else {
      return ''
    }
  }
  isModalValid = (modal) => {
    let isValid = true
    this.state[modal + 'Untoched'] = false
    for (let field in this.state[modal + 'Valid']) {
      if (this.isFieldValid(modal, field) === 'errBorder') {
        isValid = false
      }
    }
    this.forceUpdate()
    return isValid
  }
  isPetModalValid = (modal) => {
    let isValid = true
    let self = this
    this.state[modal + 'Untoched'] = false
    this.state[modal].map(function (val, i) {
      for (let field in self.state[modal + 'Valid']) {
        if (self.isPetFieldValid(modal, field, i) === 'errBorder') {
          isValid = false
        }
      }
    })
    this.forceUpdate()
    return isValid
  }
  checkPaymentInfoValid = () => {
    return true
  }
  checkContactInfoValid = () => {
    return this.isModalValid('contactInfo')
  }
  checkAddPetValid = () => {
    return this.isPetModalValid('addPet')
  }
  checkProfileInfoValid = () => {
    return this.isModalValid('profileInfo')
  }
  onTabChange = currentTab => { this.setState({ currentTab }) }
  focusOnError = () => {
    let errorInputs = ReactDOM.findDOMNode(this.Tab).getElementsByClassName('error')
    if (errorInputs.length > 0) {
      errorInputs[0].scrollIntoView()
    }
  }
  actionButton = () => {
    if (this.Tab) {
      switch (this.state.currentTab) {
        case 0:
          return [{
            onClick: () => { this.setState({ contactInfoUntoched: false }, () => { this.Tab.nextTab(); this.focusOnError() }) },
            text: 'Next'
          }]
        case 1:
        case 3:
          return [{
            onClick: this.Tab.previousTab,
            text: 'Previous',
            textOnly: true
          }, {
            onClick: () => { this.setState({ profileInfoUntoched: false }, () => { this.Tab.nextTab(); this.focusOnError() }) },
            text: 'Next'
          }]
        case 2:
          if (this.props.userType === 'scheduling_admin') {
            return [{
              round: true,
              onClick: () => { this.addAntherPet() },
              text: 'Add another pet'
            }, {
              onClick: this.Tab.previousTab,
              text: 'Previous',
              textOnly: true
            },
            {
              loading: this.props.customerProfileLoading,
              onClick: this.createContactInfo,
              text: 'Add Customer'
            }]
          }
          return [{
            round: true,
            onClick: () => { this.addAntherPet() },
            text: 'Add another pet'
          }, {
            onClick: this.Tab.previousTab,
            text: 'Previous',
            textOnly: true
          }, {
            onClick: () => { this.setState({ addPetUntoched: false }, () => { this.Tab.nextTab(); this.focusOnError() }) },
            text: 'Next'
          }]
        case 4:
          return [{
            onClick: this.Tab.previousTab,
            text: 'Previous',
            hide: this.props.customerProfileLoading,
            textOnly: true
          }, {
            loading: this.props.customerProfileLoading,
            onClick: this.createContactInfo,
            text: 'Add Customer'
          }]
      }
    }
  }

  render () {
    const tabs = [
      {
        title: '1. Contact Info',
        checkValidation: this.checkContactInfoValid,
        content: <AddContactInfo
          isFieldValid={this.isFieldValid}
          contactInfo={this.state.contactInfo}
          setParentState={this.setContactInfo}
          createProfileInfo={this.createProfileInfo} />
      }, {
        title: '2. Profile Info',
        checkValidation: this.checkProfileInfoValid,
        content: <AddProfile
          isFieldValid={this.isFieldValid}
          profileInfo={this.state.profileInfo}
          setParentState={this.setProfileInfo} />
      }, {
        title: '3. Add Pet',
        checkValidation: this.checkAddPetValid,
        content: <AddPetInfo
          isPetFieldValid={this.isPetFieldValid}
          isContactInfoValid={this.isContactInfoValid}
          addPet={this.state.addPet}
          petBreeds={this.props.petBreeds}
          setParentState={this.setAddPet} />
      }, {
        hide: this.props.userType === 'scheduling_admin',
        title: '4. Payment Info',
        checkValidation: this.checkPaymentInfoValid,
        content: <AddPaymentInfo
          isFieldValid={this.isFieldValid}
          isContactInfoValid={this.isContactInfoValid}
          paymentInfo={this.state.paymentInfo}
          setParentState={this.setPaymentInfo}
          showError={this.state.error} />
      }, {
        hide: this.props.userType === 'scheduling_admin',
        title: '5. Set Pricing',
        checkValidation: () => { return true },
        content: <AddServicePrices
          services={this.state.services}
          addons={this.state.addons}
          setParentState={this.setPrice}
          _services={this.props.services.services}
          _addons={this.props.addons.addons} />
      }
    ].filter(item => !item.hide).map(tab => {
      return Object.assign({}, tab)
    })
    return (
      <ModalTemplate
        actions={this.actionButton()}
        body={() => <div className='addCustomer-container'>
          <Tab isProgress checkValidation onRef={instance => { this.Tab = instance }} tabs={tabs} onTabChange={this.onTabChange} />
        </div>}
        title='Create Customer'
      />
    )
  }
}

function mapStateToProps (state, ownProps) {
  const userType = sessionController.selectUserType(state)
  return {
    services: state.services,
    addons: state.addons,
    payments: state.payments,
    errors: state.payments.errors,
    petBreeds: state.pets.petBreeds,
    customerProfileLoading: state.customers.loading,
    userType
  }
}

export default connect(mapStateToProps, dispatch => ({
  ratesActions: bindActionCreators(ratesActions, dispatch),
  customerActions: bindActionCreators(customerActions, dispatch),
  customerProfileActions: bindActionCreators(customerProfileActions, dispatch),
  servicesActions: bindActionCreators(servicesActions, dispatch),
  fetchAddons: bindActionCreators(fetchAddons, dispatch),
  walkersActions: bindActionCreators(walkersActions, dispatch),
  paymentsActions: bindActionCreators(paymentsActions, dispatch),
  petActions: bindActionCreators(petActions, dispatch),
  dispatch
}))(AddCustomer)
