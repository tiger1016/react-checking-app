// Libraries
import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { View, Switch } from 'react-native'

// Controllers
import { sessionController, profileController, walkersController } from '../../../controllers'

// Components
import Button from '../../globalComponents/Button'
import DataDisplay from '../../globalComponents/DataDisplay'
import SectionHeader from '../../globalComponents/SectionHeader'
import SaveCancel from '../../globalComponents/SaveCancel'

// Styles
import Styles from './styles'

class ProfileInformation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      isEdit: false,

      profile: new (profileController.basicInfoStructGenerator())(props.profileInfo),
      profileRev: new (profileController.basicInfoStructGenerator())(props.profileInfo),
      sameAsBilling: this.isSameAsBilling(props.profileInfo)
    }
    if (props.selectUserType === 'walker') {
      this.state.isEditingWalkerSecurity = false
      this.state.isEditingWalkerProfile = false
      this.state.profile = new (walkersController.walkerStructGenerator())(props.profileInfo)
      this.state.profileRev = new (walkersController.walkerStructGenerator())(props.profileInfo)
      this.state.walkerSecurityInfo = new (walkersController.walkerSecurityStructGenerator())(props.profileInfo)
      this.state.walkerSecurityInfoRev = new (walkersController.walkerSecurityStructGenerator())(props.profileInfo)
    }
  }

  isSameAsBilling (profileInfo) {
    return profileInfo.address_shipping === profileInfo.address_billing &&
      profileInfo.address2_shipping === profileInfo.address2_billing &&
      profileInfo.city_shipping === profileInfo.city_billing &&
      profileInfo.state_shipping === profileInfo.state_billing &&
      profileInfo.zip_shipping === profileInfo.zip_billing
  }

  isStateChanged = () => {
    return !_.isEqual(this.state.profile, this.state.profileRev)
  }

  componentWillUnmount () {
    // this.unblock()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectUserType === 'walker') {
      this.setState({
        profile: new (walkersController.walkerStructGenerator())(nextProps.profileInfo),
        profileRev: new (walkersController.walkerStructGenerator())(nextProps.profileInfo),
        sameAsBilling: this.isSameAsBilling(this.props.profileInfo)
      })
    } else {
      this.setState({
        profile: new (profileController.basicInfoStructGenerator())(nextProps.profileInfo),
        profileRev: new (profileController.basicInfoStructGenerator())(nextProps.profileInfo),
        sameAsBilling: this.isSameAsBilling(this.props.profileInfo)
      })
    }
  }

  handleInputValidate = ({ name, error }) => {
    if (error && !this.state.errors.filter(e => e.name === name).length) {
      this.setState({ errors: [...this.state.errors, { name, error }] })
    } else if (!error) {
      this.setState({ errors: this.state.errors.filter(e => e.name !== name) })
    }
  }

  /**
   * Toggles on editing
   * @return {Void}
   */
  editClick = () => {
    if (this.state.isEdit) {
      // appController.confirmDiscardChanges(() => { this.setState({ isEdit: false, profile: {...this.state.profileRev} }) })
      this.setState({ isEdit: false, profile: { ...this.state.profileRev } })
    } else {
      this.setState({ isEdit: true })
    }
  }

  /**
   * Save button onClick. TODO: Same as billing functionality
   * @return {Void}
   */
  updateClick = () => {
    profileController.actions.updateBasicProfile(this.state.profile, (error, data) => {
      if (!error) {
        this.setState({ isEdit: false })
      }
    })
  }

  /**
   * Toggles shipping address same as billing
   * @return {Void}
   */
  handleShippingAddressCheck = () => {
    const profile = { ...this.state.profile }
    if (this.state.sameAsBilling) {
      profile.address_shipping = ''
      profile.address2_shipping = ''
      profile.city_shipping = ''
      profile.state_shipping = ''
      profile.zip_shipping = ''
      this.setState({ sameAsBilling: false, profile })
    } else {
      profile.address_shipping = profile.address_billing
      profile.address2_shipping = profile.address2_billing
      profile.city_shipping = profile.city_billing
      profile.state_shipping = profile.state_billing
      profile.zip_shipping = profile.zip_billing

      this.setState({ sameAsBilling: true, profile })
    }
  }

  /**
   * [handleInputChange description]
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  handleInputChange = item => {
    const profile = { ...this.state.profile }
    profile[item.target.name] = item.target.value
    this.setState({ profile })
  }

  /**
   * Builds billing address string
   * @return {String} Business address
   */
  billingAddress = () => {
    let address = ''
    if (this.state.profile.address_billing) {
      address += this.state.profile.address_billing
    }

    if (this.state.profile.address2_billing) {
      address += (', ' + this.state.profile.address2_billing)
    }

    if (this.state.profile.city_billing) {
      address += (', ' + this.state.profile.city_billing)
    }

    if (this.state.profile.state_billing) {
      address += (', ' + this.state.profile.state_billing)
    }

    if (this.state.profile.zip_billing) {
      address += (', ' + this.state.profile.zip_billing)
    }

    return address
  }

  /**
   * Builds shipping addres string
   * @return {String} Shipping address
   */
  shippingAddress = () => {
    let address = ''
    if (this.state.profile.address_shipping) {
      address += this.state.profile.address_shipping
    }

    if (this.state.profile.address2_shipping) {
      address += (', ' + this.state.profile.address2_shipping)
    }

    if (this.state.profile.city_shipping) {
      address += (', ' + this.state.profile.city_shipping)
    }
    if (this.state.profile.state_shipping) {
      address += (', ' + this.state.profile.state_shipping)
    }

    if (this.state.profile.zip_shipping) {
      address += (', ' + this.state.profile.zip_shipping)
    }

    return address
  }

  createHandleSelectChange = name => selected => {
    const profile = { ...this.state.profile }
    profile[name] = selected.value
    this.setState({ profile })
  }

  rightHeaderComponent = props => <View style={Styles.headerRightComponent}>
    <Button onPress={props.onPress} textOnly iconOnly='md-create' size={24} />
  </View>

  leftHeaderComponent = props => <View style={Styles.headerLeftComponent}>
    <Button onPress={props.onPress} textOnly iconOnly='ios-arrow-back' size={24} />
  </View>

  renderLicensee = () => {
    const {
      profileIsLoading
    } = this.props

    const {
      isEdit,
      profile,
      sameAsBilling
    } = this.state

    const billingAddress = this.billingAddress()
    const ifNotEditing = !isEdit
    const shippingAddress = this.shippingAddress()

    return <View id='ProfileInformation' className='profile-section'>
      <SectionHeader title='Profile' noPadding leftAction={isEdit ? () => this.leftHeaderComponent({ onPress: () => this.setState({ isEdit: !isEdit }) }) : null} rightComponent={!isEdit ? this.rightHeaderComponent({ onPress: () => this.setState({ isEdit: !isEdit }) }) : null} />
      <View style={Styles.sectionContent}>
        <DataDisplay edit={isEdit} items={[
          {
            label: 'First Name',
            loading: !isEdit && profileIsLoading && !profile.first_name_billing,
            name: 'first_name_billing',
            onChange: this.handleInputChange,
            value: profile.first_name_billing,
            valueWidth: '30%'
          },
          {
            label: 'Last Name',
            loading: !isEdit && profileIsLoading && !profile.last_name_billing,
            name: 'last_name_billing',
            onChange: this.handleInputChange,
            value: profile.last_name_billing,
            valueWidth: '30%'
          },
          {
            label: 'Username (Email)',
            loading: !isEdit && profileIsLoading && !profile.username,
            name: 'username',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'email',
            value: profile.username,
            valueWidth: '30%'
          },
          {
            hide: ifNotEditing,
            label: 'Business Address',
            type: 'heading'
          },
          {
            hide: isEdit,
            label: 'Business Address',
            loading: !isEdit && profileIsLoading && !billingAddress,
            value: billingAddress,
            valueWidth: '40%'
          },
          {
            hide: ifNotEditing,
            label: 'Street Address',
            name: 'address_billing',
            onChange: this.handleInputChange,
            value: profile.address_billing,
            valueWidth: '40%'
          },
          {
            hide: ifNotEditing,
            label: 'Street Address 2',
            name: 'address2_billing',
            onChange: this.handleInputChange,
            value: profile.address2_billing,
            valueWidth: '40%'
          },
          {
            hide: ifNotEditing,
            label: 'City',
            name: 'city_billing',
            onChange: this.handleInputChange,
            value: profile.city_billing,
            valueWidth: '20%'
          },
          {
            hide: ifNotEditing,
            label: 'State',
            name: 'state_billing',
            onChange: this.createHandleSelectChange('state_billing'),
            onValidate: this.handleInputValidate,
            type: 'state',
            value: profile.state_billing,
            valueWidth: '10%'
          },
          {
            hide: ifNotEditing,
            label: 'Zip',
            name: 'zip_billing',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'zip',
            value: profile.zip_billing,
            valueWidth: '10%'
          },
          {
            hide: ifNotEditing,
            label: 'Shipping Address',
            type: 'heading',
            leftComponent: <Switch label='Same as billing' onValueChange={this.handleShippingAddressCheck} small value={sameAsBilling} />
          },
          {
            hide: isEdit,
            label: 'Shipping Address',
            loading: !isEdit && profileIsLoading && !(sameAsBilling ? billingAddress : shippingAddress),
            value: sameAsBilling ? billingAddress : shippingAddress,
            valueWidth: '40%'
          },
          {
            hide: ifNotEditing || sameAsBilling,
            label: 'Street Address',
            name: 'address_shipping',
            onChange: this.handleInputChange,
            value: profile.address_shipping,
            valueWidth: '40%'
          },
          {
            hide: ifNotEditing || sameAsBilling,
            label: 'Street Address 2',
            name: 'address2_shipping',
            onChange: this.handleInputChange,
            value: profile.address2_shipping,
            valueWidth: '40%'
          },
          {
            hide: ifNotEditing || sameAsBilling,
            label: 'City',
            name: 'city_shipping',
            onChange: this.handleInputChange,
            value: profile.city_shipping,
            valueWidth: '20%'
          },
          {
            hide: ifNotEditing || sameAsBilling,
            label: 'State',
            name: 'state_shipping',
            onChange: this.createHandleSelectChange('state_shipping'),
            onValidate: this.handleInputValidate,
            type: 'state',
            value: profile.state_shipping,
            valueWidth: '10%'
          },
          {
            hide: ifNotEditing || sameAsBilling,
            label: 'Zip',
            name: 'zip_shipping',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'zip',
            value: profile.zip_shipping,
            valueWidth: '10%'
          },
          {
            hide: ifNotEditing || sameAsBilling,
            type: 'break'
          },
          {
            label: 'Business Phone',
            name: 'licensee_phone',
            loading: !isEdit && profileIsLoading && !profile.licensee_phone,
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'phone',
            value: profile.licensee_phone,
            valueWidth: '20%'
          },
          {
            label: 'Sales Tax %',
            loading: !isEdit && profileIsLoading && !profile.sales_tax_percentage,
            name: 'sales_tax_percentage',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'percent',
            decimalLimit: 3,
            value: profile.sales_tax_percentage,
            valueWidth: '10%'
          },
          {
            label: 'Timezone',
            loading: !isEdit && profileIsLoading && !profile.time_zone,
            name: 'time_zone',
            type: 'timezone',
            onChange: this.createHandleSelectChange('time_zone'),
            value: profile.time_zone,
            valueWidth: '5%'
          },
          {
            hide: true,
            label: 'Company Logo',
            loading: !isEdit && profileIsLoading && !profile.logo,
            name: 'logo',
            onChange: this.handleInputChange,
            type: 'image',
            value: profile.logo,
            valueWidth: '30%'
          },
          {
            hide: ifNotEditing,
            type: 'break'
          }
        ]} />
      </View>
      {isEdit && <SaveCancel loading={this.props.profileIsLoading} disabled={this.state.errors.length} cancelOnClick={() => this.setState({ isEdit: !isEdit })} saveOnClick={this.updateClick} />}
    </View>
  }

  renderWalker = () => {
    const {
      isEditingWalkerProfile,
      isEditingWalkerSecurity,
      profile,
      walkerSecurityInfo,
      errors
    } = this.state

    return <View id='ProfileInformation' className='profile-section'>
      {!isEditingWalkerSecurity && <View>
        <SectionHeader title='Contact Information' noPadding leftAction={isEditingWalkerProfile ? () => this.leftHeaderComponent({ onPress: () => this.setState({ isEditingWalkerProfile: !isEditingWalkerProfile }) }) : null} rightComponent={!isEditingWalkerProfile ? this.rightHeaderComponent({ onPress: () => this.setState({ isEditingWalkerProfile: !isEditingWalkerProfile }) }) : null} />
        <View style={Styles.sectionContent}>
          <DataDisplay edit={this.state.isEditingWalkerProfile} items={[
            {
              label: 'Contact Information',
              type: 'heading'
            },
            {
              label: 'First Name',
              name: 'first_name',
              onChange: this.handleInputChange,
              required: true,
              value: profile.first_name,
              valueMinWidth: '180px'
            },
            {
              label: 'Last Name',
              name: 'last_name',
              onChange: this.handleInputChange,
              required: true,
              value: profile.last_name,
              valueMinWidth: '180px'
            },
            {
              label: 'Email',
              name: 'email',
              onChange: this.handleInputChange,
              onValidate: this.handleInputValidate,
              required: true,
              type: 'email',
              value: profile.email,
              valueMinWidth: '180px'
            },
            {
              error: errors.filter(e => e.name === 'phone_mobile').length,
              label: 'Mobile',
              name: 'phone_mobile',
              onChange: this.handleInputChange,
              onValidate: this.handleInputValidate,
              required: true,
              type: 'phone',
              value: profile.phone_mobile,
              valueMinWidth: '180px'
            },
            {
              error: errors.filter(e => e.name === 'phone_work').length,
              label: 'Work Phone',
              name: 'phone_work',
              onChange: this.handleInputChange,
              onValidate: this.handleInputValidate,
              type: 'phone',
              value: profile.phone_work,
              valueMinWidth: '180px'
            },
            {
              error: errors.filter(e => e.name === 'phone_home').length,
              label: 'Home Phone',
              name: 'phone_home',
              onChange: this.handleInputChange,
              onValidate: this.handleInputValidate,
              type: 'phone',
              value: profile.phone_home,
              valueMinWidth: '180px'
            },
            {
              label: 'Address',
              name: 'address',
              onChange: this.handleInputChange,
              required: true,
              value: profile.address,
              valueMinWidth: '180px'
            },
            {
              label: 'Address 2',
              name: 'address2',
              onChange: this.handleInputChange,
              value: profile.address2,
              valueMinWidth: '180px'
            },
            {
              label: 'City',
              name: 'city',
              onChange: this.handleInputChange,
              required: true,
              value: profile.city,
              valueMinWidth: '180px'
            },
            {
              label: 'State',
              name: 'state',
              onChange: (e) => this.handleInputChange(e, 'select', 'state'),
              onValidate: this.handleInputValidate,
              required: true,
              type: 'state',
              value: profile.state,
              valueMinWidth: '180px'
            },
            {
              label: 'Zip',
              name: 'zip',
              onChange: this.handleInputChange,
              onValidate: this.handleInputValidate,
              required: true,
              type: 'zip',
              value: profile.zip,
              valueMinWidth: '180px'
            },
            {
              label: 'Work Information',
              type: 'heading'
            },
            {
              label: 'Hire Date',
              name: 'hire_date',
              onChange: this.handleHireDateChange,
              value: profile.hire_date,
              type: 'date-picker',
              valueMinWidth: '180px'
            },
            {
              label: 'Transportation Type',
              name: 'transportation_type',
              onChange: this.handleInputChange,
              value: profile.transportation_type,
              valueMinWidth: '180px'
            },
            {
              label: 'License Plate',
              name: 'license_plate',
              onChange: this.handleInputChange,
              value: profile.license_plate,
              valueMinWidth: '180px'
            },
            {
              label: 'Payroll Frequency',
              name: 'payroll_frequency',
              onChange: (e) => this.handleInputChange(e, 'select', 'payroll_frequency'),
              type: 'billing-frequency',
              value: profile.payroll_frequency,
              valueMinWidth: '180px'
            },
            {
              label: 'Payroll Date',
              name: 'payroll_date',
              onChange: (e) => this.handleInputChange(e, 'select', 'payroll_date'),
              type: 'day-of-month',
              value: profile.payroll_date,
              valueMinWidth: '180px',
              hide: profile.payroll_frequency !== 'monthly'
            },
            {
              label: 'Email Payroll Reports',
              name: 'payroll_email',
              onChange: (e) => this.handleInputChange(e, 'select', 'payroll_email'),
              type: 'toggle-select',
              value: profile.payroll_email,
              valueMinWidth: '180px'
            },
            {
              label: 'Email Alerts',
              name: 'alerts_email',
              onChange: (e) => this.handleInputChange(e, 'select', 'alerts_email'),
              type: 'toggle-select',
              value: profile.alerts_email,
              hide: true
            },
            {
              label: 'Walker Access Level',
              name: 'walker_admin',
              onChange: (e) => this.handleInputChange(e, 'select', 'walker_admin'),
              type: 'walker-access-level-select',
              value: profile.walker_admin
            },
            {
              label: 'Notes',
              name: 'notes',
              onChange: this.handleInputChange,
              type: 'textarea',
              value: profile.notes
            },
            {
              label: 'Bio',
              name: 'bio',
              onChange: this.handleInputChange,
              type: 'textarea',
              value: profile.bio
            },
            {
              label: 'Emergency Contact Information',
              type: 'heading'
            },
            {
              label: 'Name',
              name: 'name_emergency',
              onChange: this.handleInputChange,
              value: profile.name_emergency
            },
            {
              label: 'Phone',
              name: 'phone_emergency',
              onChange: this.handleInputChange,
              value: profile.phone_emergency
            }
          ]} />
        </View>
        {isEditingWalkerProfile && <SaveCancel loading={this.props.profileIsLoading} disabled={this.state.errors.length} cancelOnClick={() => this.setState({ isEditingWalkerProfile: !isEditingWalkerProfile })} saveOnClick={this.updateClick} />}
      </View>}
      {!isEditingWalkerProfile && <View>
        <SectionHeader title='Security' noPadding leftAction={isEditingWalkerSecurity ? () => this.leftHeaderComponent({ onPress: () => this.setState({ isEditingWalkerSecurity: !isEditingWalkerSecurity }) }) : null} rightComponent={!isEditingWalkerSecurity ? this.rightHeaderComponent({ onPress: () => this.setState({ isEditingWalkerSecurity: !isEditingWalkerSecurity }) }) : null} />
        <View style={Styles.sectionContent}>
          <DataDisplay edit={this.state.isEditingWalkerSecurity} items={[
            {
              label: 'Password',
              name: 'password',
              onChange: this.handleSecurityInputChange,
              onValidate: this.handleSecurityInputValidate,
              value: walkerSecurityInfo.password,
              required: true,
              type: 'password',
              hide: this.props.isWalker
            },
            {
              error: walkerSecurityInfo.password !== walkerSecurityInfo.password2,
              label: 'Verify Password',
              name: 'password2',
              onChange: this.handleSecurityInputChange,
              onValidate: this.handleSecurityInputValidate,
              value: walkerSecurityInfo.password2 || '',
              required: true,
              type: 'password',
              hide: this.props.isWalker || !this.state.isEditingWalkerSecurity
            },
            {
              label: 'Security Question',
              name: 'security_question',
              onChange: this.handleSecurityInputChange,
              onValidate: this.handleSecurityInputValidate,
              value: walkerSecurityInfo.security_question,
              required: true
            },
            {
              label: 'Answer',
              name: 'security_answer',
              onChange: this.handleSecurityInputChange,
              onValidate: this.handleSecurityInputValidate,
              value: walkerSecurityInfo.security_answer,
              required: true
            }
          ]} />
        </View>
        {isEditingWalkerSecurity && <SaveCancel loading={this.props.profileIsLoading} disabled={this.state.errors.length} cancelOnClick={() => this.setState({ isEditingWalkerSecurity: !isEditingWalkerSecurity })} saveOnClick={this.updateClick} />}
      </View>}
    </View>
  }

  renderProfile = () => {

  }

  render () {
    switch (this.props.selectUserType) {
      // case 'customer':

      //   break
      case 'walker':
        return this.renderWalker()
      default:
        return this.renderLicensee()
    }
  }
}

const mapStateToProps = state => {
  const selectUserType = sessionController.selectUserType(state)
  let profileInfo = state.profile.profile
  let profileIsLoading = state.profile.loading
  if (selectUserType === 'walker') {
    profileInfo = state.walkers.walkers.length > 0 ? state.walkers.walkers[0] : {}
    profileIsLoading = state.walkers.loading
  }
  return {
    selectUserType,
    profileInfo,
    profileIsLoading
  }
}

export default connect(mapStateToProps)(ProfileInformation)
