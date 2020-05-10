// Libraries
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import qs from 'qs'
import moment from 'moment'

// Components
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import StaffAddon from './components/StaffAddon'
import StaffContact from './components/StaffContact'
import StaffPayroll from './components/StaffPayroll'
import StaffServices from './components/StaffServices'
import StaffWorkInfo from './components/StaffWorkInfo'
import { Tab } from 'GlobalComponents/TabComponent/Tab'

// Controllers
import { appController, servicesController, walkersController } from 'Controllers'

// Actions
import fetchFullAddons from 'Actions/addons/fetchFullAddons'
import fetchFullServices from 'Actions/services/fetchFullServices'

// Styles
import './index.css'

function ProfileVM () {
  this.password = ''
  this.password2 = ''
  this.username = ''
  this.active = ''
  this.first_name = ''
  this.last_name = ''
  this.email = ''
  this.address = ''
  this.address2 = ''
  this.city = ''
  this.state = ''
  this.zip = ''
  this.phone_mobile = ''
  this.phone_home = ''
  this.phone_work = ''
  this.admin = ''
  this.admin_full = ''
  this.hire_date = moment()
  this.bio = ''
  this.transportation_type = ''
  this.license_plate = ''
  this.name_emergency = ''
  this.phone_emergency = ''
  this.security_question = ''
  this.security_answer = ''
  this.notes = ''
  this.payroll_frequency = 'weekly'
  this.payroll_date = ''
  this.payroll_email = 1
  this.default_payroll_type = 'dollar'
  this.alerts_email = 1
  this.walker_admin = ''
}
let contactValid = {
  first_name: ['required'],
  last_name: ['required'],
  email: ['required', 'email'],
  phone_mobile: ['required', 'phone'],
  address: ['required'],
  city: ['required'],
  state: ['required'],
  zip: ['required', 'zip']
}
let profileValid = {
  security_question: ['required'],
  security_answer: ['required'],
  password: ['required'],
  password2: ['password2'],
  hire_date: ['required']
}

class AddWalker extends Component {
  constructor (props) {
    super(props)
    this.Tab = null
    this.state = {
      currentTab: 0,
      Profile: new ProfileVM(),
      isValid: false,
      addons: [],
      services: [],
      contactUntoched: true,
      contactValid: contactValid,
      profileUntoched: true,
      profileValid: profileValid,
      payrollType: 'dollar'
    }
  }
  componentWillMount () {
    const { fetchFullAddons, fetchFullServices } = this.props
    fetchFullServices({ archived: '1' })
    fetchFullAddons({ archived: 1 })
  }
  componentWillReceiveProps (newProps) {
    if (newProps.services !== this.state.services) {
      this.setState({ services: newProps.services })
    }
    if (newProps.addons !== this.state.addons) {
      this.setState({ addons: newProps.addons })
    }
  }
  handleInputChange = (event, type, name) => {
    let { Profile } = this.state
    let targetInputName, targetInputValue

    switch (type) {
      case 'date':
      case 'input':
      case 'select':
        targetInputName = name
        break
      default:
        targetInputName = event.target.name
    }

    switch (type) {
      case 'checkbox':
        targetInputValue = !Profile[targetInputName]
        break
      case 'date':
        targetInputValue = event
        break
      case 'select':
        targetInputValue = event.value
        break
      default:
        targetInputValue = event.target.value
    }
    Profile[targetInputName] = targetInputValue
    this.setState({ Profile })
  }
  handleServicesInputChange = (item, name) => {
    let { services } = this.state
    services.forEach(val => {
      if (val.id.toString() === name.toString()) {
        val.staff_pay_rate = item.target.value
      }
    })
    this.setState({ services })
  }
  handlePayRollTypeChange = (item) => {
    this.setState({ payrollType: item.target.value })
  }
  handleAddonsInputChange = (item, name) => {
    let { addons } = this.state
    addons.forEach(val => {
      if (val.id.toString() === name.toString()) {
        val.addon_pay_price = item.target.value
      }
    })
    this.setState({ addons })
  }
  isFieldValid = (modal, field) => {
    if (field === 'password2') {
      if (this.state.Profile['password2'] === this.state.Profile['password']) {
        return ''
      } else { return 'errBorder' }
    }
    if (!this.state[modal + 'Untoched'] && this.state[modal + 'Valid'][field]) {
      let isValid = true
      let self = this
      this.state[modal + 'Valid'][field].map(function (item) {
        switch (item) {
          case 'required':
            if (self.state.Profile[field] && self.state.Profile[field] != null && self.state.Profile[field] !== undefined && self.state.Profile[field] !== '') {
              isValid = true
            } else { isValid = false }
            break
          case 'password2':
            if (self.state.Profile['password2'] === self.state.Profile['password']) {
              isValid = true
            } else { isValid = false }
            break
          default:
        }
      })
      if (isValid) {
        return ''
      }
      return 'errBorder'
    }
    return ''
  }
  isModalValid = modal => {
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
  SaveProfile = event => walkersController.actions.createWalker(this.state.Profile, this.SaveProfilecallback)
  SaveProfilecallback = (err, data) => {
    if (!err) {
      appController.closeModal()
      let services = {}
      let addons = {}
      if (this.state.services && this.state.services.length > 0) {
        this.state.services.forEach(val => {
          services[val.id] = val.staff_pay_rate ? val.staff_pay_rate : val.default_walker_payroll
        })
        let servicedata = qs.stringify({ services, pay_type: this.state.payrollType })

        walkersController.actions.addWalkerService(data.walker.user_id, servicedata)
      }
      if (this.state.addons && this.state.addons && this.state.addons.length > 0) {
        this.state.addons.forEach(val => {
          addons[val.id] = val.addon_pay_price ? val.addon_pay_price : val.default_walker_payroll
        })
        let addondata = qs.stringify({ addons, pay_type: this.state.payrollType })
        walkersController.actions.addWalkerAddon(data.walker.user_id, addondata)
      }
    }
  }
  onTabChange = currentTab => this.setState({ currentTab })
  actionButton = () => {
    if (this.Tab) {
      switch (this.state.currentTab) {
        case 0:
          return [{
            onClick: this.Tab.nextTab,
            text: 'Next'
          }]
        case 1:
        case 2:
        case 3:
          return [{
            onClick: this.Tab.previousTab,
            text: 'Previous',
            textOnly: true
          }, {
            onClick: () => { this.Tab.nextTab(); this.focusOnError() },
            text: 'Next'
          }]
        case 4:
          return [{
            hide: this.props.walkerIsLoading,
            onClick: this.Tab.previousTab,
            text: 'Previous',
            textOnly: true
          }, {
            loading: this.props.walkerIsLoading,
            onClick: this.SaveProfile,
            text: 'Add Staff'
          }]
      }
    }
    return null
  }
  focusOnError = () => {
    this.forceUpdate(() => {
      let errorInputs = ReactDOM.findDOMNode(this.Tab).getElementsByClassName('error')
      if (errorInputs.length > 0) {
        errorInputs[0].scrollIntoView()
      }
    })
  }
  render () {
    let {
      addons,
      Profile,
      services,
      payrollType
    } = this.state
    const tabs = [
      {
        title: '1. Contact Info',
        // checkValidation: () => this.isModalValid('contact'),
        checkValidation: () => true,
        content: <StaffContact Profile={Profile} handleInputChange={this.handleInputChange} isFieldValid={this.isFieldValid} />
      }, {
        title: '2. Profile Info',
        // checkValidation: () => this.isModalValid('profile'),
        checkValidation: () => true,
        content: <StaffWorkInfo Profile={Profile} handleInputChange={this.handleInputChange} isFieldValid={this.isFieldValid} />
      }, {
        title: '3. Payroll',
        checkValidation: () => true,
        content: <StaffPayroll Profile={Profile} payrollType={payrollType} handlePayRollTypeChange={this.handlePayRollTypeChange} handleInputChange={this.handleInputChange} />
      },
      {
        title: '4. Service Pay',
        checkValidation: () => true,
        content: <StaffServices payrollType={payrollType} services={services} handleServicesInputChange={this.handleServicesInputChange} />
      },
      {
        title: '5. Add-On Pay',
        checkValidation: () => true,
        content: <StaffAddon payrollType={payrollType} addons={addons} handleAddonsInputChange={this.handleAddonsInputChange} />
      }
    ].map(tab => Object.assign({}, tab))
    return (
      <ModalTemplate
        actions={this.actionButton()}
        body={() => <div className='AddStaffModal'>
          <Tab checkValidation isProgress onRef={instance => { this.Tab = instance }} onTabChange={this.onTabChange} tabs={tabs} />
        </div>}
        title='Add Staff'
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    addons: state.addons.addons,
    services: servicesController.selectActiveServices(state),
    walkerIsLoading: state.walkers.loading
  }
}

const mapDispatchToProps = {
  fetchFullAddons,
  fetchFullServices
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWalker)
