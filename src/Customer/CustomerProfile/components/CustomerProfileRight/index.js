// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController } from 'Controllers/appController'
import { customersController } from 'Controllers/customersController'
import { servicesController } from 'Controllers/servicesController'
import { walkersController } from 'Controllers/walkersController'

// Components
import Button from 'GlobalComponents/Button'
import DataDisplay from 'GlobalComponents/DataDisplay'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionBody from 'GlobalComponents/SectionBody'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Styles
import './index.css'

class CustomerProfileRight extends React.PureComponent {
  state = {
    customer: this.props.customer,
    customerRev: this.props.customer,
    errors: [],
    profileErrors: [],
    isEditingContact: false,
    isEditingProfile: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!_.isEqual(nextProps.customer, prevState.customerRev)) {
      return {
        customer: nextProps.customer,
        customerRev: nextProps.customer
      }
    }

    return null
  }

  isStateChanged = () => !_.isEqual(this.state.customer, this.state.customerRev)

  handleInputValidate = ({ name, error }) => {
    const { errors } = this.state
    if (error && !errors.filter(e => e.name === name).length) {
      this.setState({ errors: [...errors, { name, error }] })
    } else if (!error) {
      this.setState({ errors: errors.filter(e => e.name !== name) })
    }
  }

  handleProfileInputValidate = ({ name, error }) => {
    const { profileErrors } = this.state
    if (error && !profileErrors.filter(e => e.name === name).length) {
      this.setState({
        profileErrors: [...profileErrors, { name, error }]
      })
    } else if (!error) {
      this.setState({
        profileErrors: profileErrors.filter(e => e.name !== name)
      })
    }
  }

  handleInputChange = item => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        [item.target.name]: item.target.value
      }
    })
  }

  handleStateChange = selected => {
    const { customer } = this.state
    if (selected) {
      this.setState({
        customer: {
          ...customer,
          state: selected.value
        }
      })
    }
  }

  handleServiceChange = selected => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        default_service: selected.value
      }
    })
  }

  handleWalkerChange = selected => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        walker_id: selected.value
      }
    })
  }

  handleQrCodeChange = selected => {
    const { customer } = this.state
    this.setState({
      customer: {
        ...customer,
        qr_code: selected.value
      }
    })
  }

  toggleEditContact = () => {
    const {
      customerRev,
      isEditingContact
    } = this.state
    if (isEditingContact) {
      const handleEditCancel = () => this.setState({
        isEditingContact: false,
        customer: customerRev
      })
      if (this.isStateChanged()) {
        appController.confirmDiscardChanges(handleEditCancel)
      } else {
        this.setState({ isEditingContact: false })
      }
    } else {
      this.setState({ isEditingContact: true })
    }
  }

  toggleEditProfile = () => {
    const {
      customerRev,
      isEditingProfile
    } = this.state
    if (isEditingProfile) {
      const handleEditCancel = () => this.setState({
        isEditingProfile: false,
        customer: customerRev
      })
      if (this.isStateChanged()) {
        appController.confirmDiscardChanges(handleEditCancel)
      } else {
        this.setState({ isEditingProfile: false })
      }
    } else {
      this.setState({ isEditingProfile: true })
    }
  }

  updateClick = type => () => {
    let customerData = this.state.customer
    if (this.state.customer.password === '') {
      customerData = _.omit(this.state.customer, 'password')
    }

    customersController.actions.updateCustomer(this.props.customerId, customerData, (err, res) => {
      if (!err) {
        switch (type) {
          case 'Profile':
            this.setState({ isEditingProfile: false })
            break
          case 'Contact':
            this.setState({ isEditingContact: false })
            break
        }
      }
    })
  }

  render () {
    const {
      customersLoading,
      serviceName,
      walkerFirstName,
      walkerLastName
    } = this.props

    const {
      customer,
      customerRev,
      errors,
      isEditingContact,
      isEditingProfile,
      profileErrors
    } = this.state

    return <div className='CustomerProfileRight'>
      <SectionBody>
        <SectionHeader
          title='Contact Info'
          noPadding
          rightComponent={<Button
            onClick={this.toggleEditContact}
            textOnly
            iconOnly='ion-edit'
          />}
        />
        <div className='content'>
          <div>
            <h6>Primary Contact</h6>
            <DataDisplay edit={isEditingContact} items={[
              {
                label: 'First Name',
                loading: customersLoading,
                name: 'first_name',
                onChange: this.handleInputChange,
                required: true,
                value: customer.first_name,
                valueMinWidth: '180px'
              },
              {
                label: 'Last Name',
                loading: customersLoading,
                name: 'last_name',
                onChange: this.handleInputChange,
                required: true,
                value: customer.last_name,
                valueMinWidth: '180px'
              },
              {
                label: 'Username (Email)',
                loading: customersLoading,
                name: 'email',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                required: true,
                type: 'email',
                value: customer.email,
                valueMinWidth: '180px'
              },
              {
                error: errors.filter(e => e.name === 'phone_mobile').length,
                label: 'Mobile',
                loading: customersLoading,
                name: 'phone_mobile',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                required: true,
                type: 'phone',
                value: customer.phone_mobile,
                valueMinWidth: '180px'
              },
              {
                error: errors.filter(e => e.name === 'phone_work').length,
                label: 'Work Phone',
                loading: customersLoading,
                name: 'phone_work',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'phone',
                value: customer.phone_work,
                valueMinWidth: '180px'
              },
              {
                error: errors.filter(e => e.name === 'phone_home').length,
                label: 'Home Phone',
                loading: customersLoading,
                name: 'phone_home',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'phone',
                value: customer.phone_home,
                valueMinWidth: '180px'
              },
              {
                label: 'Address',
                loading: customersLoading,
                name: 'address',
                onChange: this.handleInputChange,
                required: true,
                value: customer.address,
                valueMinWidth: '180px'
              },
              {
                label: 'Address 2',
                loading: customersLoading,
                name: 'address2',
                onChange: this.handleInputChange,
                value: customer.address2,
                valueMinWidth: '180px'
              },
              {
                label: 'City',
                loading: customersLoading,
                name: 'city',
                onChange: this.handleInputChange,
                required: true,
                value: customer.city,
                valueMinWidth: '180px'
              },
              {
                label: 'State',
                loading: customersLoading,
                name: 'state',
                onChange: this.handleStateChange,
                onValidate: this.handleInputValidate,
                required: true,
                type: 'state',
                value: customer.state,
                valueMinWidth: '180px'
              },
              {
                label: 'Zip',
                loading: customersLoading,
                name: 'zip',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                required: true,
                type: 'zip',
                value: customer.zip,
                valueMinWidth: '180px'
              }
            ]} />
          </div>
          <div>
            <h6>Secondary Contact</h6>
            <DataDisplay edit={isEditingContact} items={[
              {
                label: 'First Name',
                loading: customersLoading,
                name: 'first_name_secondary',
                onChange: this.handleInputChange,
                value: customer.first_name_secondary,
                valueMinWidth: '180px'
              },
              {
                label: 'Last Name',
                loading: customersLoading,
                name: 'last_name_secondary',
                onChange: this.handleInputChange,
                value: customer.last_name_secondary,
                valueMinWidth: '180px'
              },
              {
                label: 'Email',
                loading: customersLoading,
                name: 'email_secondary',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'email',
                value: customer.email_secondary,
                valueMinWidth: '180px'
              },
              {
                error: errors.filter(e => e.name === 'phone_mobile_secondary').length,
                label: 'Mobile',
                loading: customersLoading,
                name: 'phone_mobile_secondary',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'phone',
                value: customer.phone_mobile_secondary,
                valueMinWidth: '180px'
              },
              {
                error: errors.filter(e => e.name === 'phone_work_secondary').length,
                label: 'Work Phone',
                loading: customersLoading,
                name: 'phone_work_secondary',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'phone',
                value: customer.phone_work_secondary,
                valueMinWidth: '180px'
              },
              {
                error: errors.filter(e => e.name === 'phone_home_secondary').length,
                label: 'Home Phone',
                loading: customersLoading,
                name: 'phone_home_secondary',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'phone',
                value: customer.phone_home_secondary,
                valueMinWidth: '180px'
              }
            ]} />
          </div>
          <div>
            <h6>Emergency Contact</h6>
            <DataDisplay edit={isEditingContact} items={[
              {
                label: 'First Name',
                loading: customersLoading,
                name: 'first_name_emergency',
                onChange: this.handleInputChange,
                value: customer.first_name_emergency
              },
              {
                label: 'Last Name',
                loading: customersLoading,
                name: 'last_name_emergency',
                onChange: this.handleInputChange,
                value: customer.last_name_emergency
              },
              {
                label: 'Email',
                loading: customersLoading,
                name: 'email_emergency',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'email',
                value: customer.email_emergency
              },
              {
                error: errors.filter(e => e.name === 'phone_emergency').length,
                label: 'Phone',
                loading: customersLoading,
                name: 'phone_emergency',
                onChange: this.handleInputChange,
                onValidate: this.handleInputValidate,
                type: 'phone',
                value: customer.phone_emergency
              }
            ]} />
          </div>
        </div>
        {isEditingContact && <SaveCancel
          disabled={errors.length}
          loading={customersLoading}
          cancelOnClick={this.toggleEditContact}
          saveOnClick={this.updateClick('Contact')}
        />}
        <div className='division' />
        <SectionHeader
          title='Profile'
          noPadding
          rightComponent={<Button
            onClick={this.toggleEditProfile}
            textOnly
            iconOnly='ion-edit'
          />}
        />
        <div className='content'>
          <DataDisplay edit={isEditingProfile} items={[
            {
              label: 'Password',
              loading: customersLoading,
              name: 'password',
              type: 'password',
              onChange: this.handleInputChange,
              onValidate: this.handleProfileInputValidate,
              value: customer.password,
              placeholder: '********'
            },
            {
              label: 'House Alarm Code',
              loading: customersLoading,
              name: 'house_alarm_code',
              onChange: this.handleInputChange,
              value: customer.house_alarm_code
            },
            {
              label: 'QrCode',
              loading: customersLoading,
              name: 'qrcode',
              onChange: this.handleQrCodeChange,
              type: 'qrcode-select',
              originalValue: parseInt(customerRev.qr_code || 0),
              value: parseInt(customer.qr_code || 0)
            },
            {
              label: 'QR Code Location',
              loading: customersLoading,
              name: 'qr_code_location',
              onChange: this.handleInputChange,
              value: customer.qr_code_location || ''
            },
            {
              label: 'Customer Notes',
              name: 'notes',
              onChange: this.handleInputChange,
              type: 'textarea',
              value: customer.notes,
              help: {
                text: 'not visible to customer; internal use only.', place: 'right'
              }
            },
            {
              label: 'Key Notes',
              name: 'key_info',
              onChange: this.handleInputChange,
              type: 'textarea',
              value: customer.key_info
            },
            {
              label: 'Default Staff',
              loading: customersLoading,
              name: 'walker_id',
              type: 'walker-select',
              onChange: this.handleWalkerChange,
              value: customer.walker_id,
              displayAs: `${walkerFirstName || ''} ${walkerLastName || ''}`
            },
            {
              label: 'Default Service',
              loading: customersLoading,
              name: 'default_service',
              type: 'service-select',
              onChange: this.handleServiceChange,
              value: customer.default_service,
              displayAs: serviceName
            },
            {
              label: 'Sign Up Date',
              loading: customersLoading,
              name: 'sign_up_date',
              noEdit: true,
              onChange: this.handleInputChange,
              value: moment(customer.sign_up_date).format('MM/DD/YYYY')
            },
            {
              label: 'Referred By',
              loading: customersLoading,
              name: 'referred_from',
              onChange: this.handleInputChange,
              value: customer.referred_from
            }
          ]} />
        </div>

        {isEditingProfile && <SaveCancel
          disabled={profileErrors.length}
          loading={customersLoading}
          cancelOnClick={this.toggleEditProfile}
          saveOnClick={this.updateClick('Profile')}
        />}
      </SectionBody>
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

CustomerProfileRight.propTypes = {
  customerId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  customersLoading: PropTypes.bool,
  serviceName: PropTypes.string,
  walkerFirstName: PropTypes.string,
  walkerLastName: PropTypes.string,
  customer: PropTypes.object
}

const mapStateToProps = (state, props) => {
  const { customerId } = props
  let customer = state.customers.customers.find(c => `${c.user_id}` === `${customerId}`)
  if (!customer) {
    customer = state.customers.customers.find(c => `${c.walker_id}` === `${customerId}`)
  }
  const service = servicesController.selectServiceById(state, customer.default_service) || {}
  const walker = walkersController.selectWalkerById(state, customer.walker_id) || {}
  const formattedCustomer = customersController.customerStructGenerator(customer)

  return {
    customersLoading: state.customers.loading,
    serviceName: service.dropdown_description,
    walkerFirstName: walker.first_name,
    walkerLastName: walker.last_name,
    customer: formattedCustomer
  }
}

export default withRouter(connect(mapStateToProps)(CustomerProfileRight))
