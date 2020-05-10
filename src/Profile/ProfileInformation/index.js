// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController, profileController } from 'Controllers'

// Components
import Button from 'GlobalComponents/Button'
import ButtonGroup from 'GlobalComponents/ButtonGroup'
import Checkbox from 'GlobalComponents/input/Checkbox'
import DataDisplay from 'GlobalComponents/DataDisplay'
import SectionHeader from 'GlobalComponents/SectionHeader'
import SaveCancel from 'GlobalComponents/SaveCancel'

// Styles
import './index.css'

class ProfileInformation extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      isEdit: false,
      profile: new (profileController.basicInfoStructGenerator())(this.props.profileInfo),
      profileRev: new (profileController.basicInfoStructGenerator())(this.props.profileInfo),
      sameAsBilling: this.isSameAsBilling(this.props.profileInfo)
    }
  }

  isSameAsBilling (profileInfo) {
    return profileInfo.address_shipping === profileInfo.address_billing &&
    profileInfo.address2_shipping === profileInfo.address2_billing &&
    profileInfo.city_shipping === profileInfo.city_billing &&
    profileInfo.state_shipping === profileInfo.state_billing &&
    profileInfo.zip_shipping === profileInfo.zip_billing
  }

  componentWillMount () {
    profileController.actions.fetchBasicProfile()
  }

  isStateChanged = () => {
    return !_.isEqual({ ...this.state.profile }, { ...this.state.profileRev })
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.profileInfo.username) {
      this.setState({ profile: new (profileController.basicInfoStructGenerator())(nextProps.profileInfo),
        profileRev: new (profileController.basicInfoStructGenerator())(nextProps.profileInfo),
        sameAsBilling: this.isSameAsBilling(this.props.profileInfo) })
    }
  }

  handleInputValidate = ({ name, error }) => {
    if (error && !this.state.errors.filter(e => e.name === name).length) {
      this.setState({ errors: [ ...this.state.errors, { name, error } ] })
    } else if (!error) {
      this.setState({ errors: this.state.errors.filter(e => e.name !== name) })
    }
  }

  editClick = () => {
    if (this.state.isEdit) {
      if (this.isStateChanged()) {
        appController.confirmDiscardChanges(() => {
          this.setState({
            isEdit: false,
            profile: { ...this.state.profileRev }
          })
        })
      } else {
        this.setState({ isEdit: false })
      }
    } else {
      this.setState({ isEdit: true })
    }
  }

  updateClick = () => {
    profileController.actions.updateBasicProfile(this.state.profile, (error, data) => {
      if (!error) {
        this.setState({ isEdit: false })
      }
    })
  }

  handleShippingAddressCheck = () => {
    let profile = { ...this.state.profile }
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

  handleInputChange = item => {
    const profile = { ...this.state.profile }
    profile[item.target.name] = item.target.value
    this.setState({ profile })
  }

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

  rightHeaderComponent = props => <div className='headerRightComponent'>
    <Link to='/scheduler/month'><Button textOnly iconOnly='ion-calendar' /></Link>
  </div>

  render () {
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

    return <div id='ProfileInformation' className='profile-section'>
      <SectionHeader title='Profile' noPadding />
      <div className='section-content'>
        <DataDisplay edit={isEdit} items={[
          {
            label: 'First Name',
            loading: !isEdit && profileIsLoading && !profile.first_name,
            name: 'first_name',
            onChange: this.handleInputChange,
            value: profile.first_name,
            valueWidth: '30%'
          },
          {
            label: 'Last Name',
            loading: !isEdit && profileIsLoading && !profile.last_name,
            name: 'last_name',
            onChange: this.handleInputChange,
            value: profile.last_name,
            valueWidth: '30%'
          },
          {
            label: 'Username (Email)',
            loading: !isEdit && profileIsLoading && !profile.username,
            name: 'username',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            required: true,
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
            value: billingAddress
          },
          {
            hide: ifNotEditing,
            label: 'Street Address',
            name: 'address_billing',
            onChange: this.handleInputChange,
            value: profile.address_billing
          },
          {
            hide: ifNotEditing,
            label: 'Street Address 2',
            name: 'address2_billing',
            onChange: this.handleInputChange,
            value: profile.address2_billing
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
            leftComponent: <Checkbox label='Same as billing' onChange={this.handleShippingAddressCheck} small checked={sameAsBilling} />
          },
          {
            hide: isEdit,
            label: 'Shipping Address',
            loading: !isEdit && profileIsLoading && !(sameAsBilling ? billingAddress : shippingAddress),
            value: sameAsBilling ? billingAddress : shippingAddress
          },
          {
            hide: ifNotEditing || sameAsBilling,
            label: 'Street Address',
            name: 'address_shipping',
            onChange: this.handleInputChange,
            value: profile.address_shipping
          },
          {
            hide: ifNotEditing || sameAsBilling,
            label: 'Street Address 2',
            name: 'address2_shipping',
            onChange: this.handleInputChange,
            value: profile.address2_shipping
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
            required: false,
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
      </div>
      {isEdit ? <SaveCancel
        loading={this.props.profileIsLoading}
        disabled={this.state.errors.length}
        cancelOnClick={this.editClick}
        saveOnClick={this.updateClick}
      /> : <ButtonGroup
        buttons={[{ onClick: this.editClick, text: 'Edit' }]}
      />}
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    profileInfo: state.profile.profile,
    profileIsLoading: state.profile.loading
  }
}

export default withRouter(connect(mapStateToProps)(ProfileInformation))
