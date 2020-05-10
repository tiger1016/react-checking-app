// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController, profileController } from '../../../controllers'

// Components
import ButtonGroup from '../../globalComponents/ButtonGroup'
import DataDisplay from '../../globalComponents/DataDisplay'
import SectionHeader from '../../globalComponents/SectionHeader'
import SaveCancel from '../../globalComponents/SaveCancel'

class PaymentInformation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      isEdit: false,
      paymentInfo: new (profileController.paymentInfoStructGenerator())(this.props.paymentInfo),
      paymentInfoRev: new (profileController.paymentInfoStructGenerator())(this.props.paymentInfo)
    }
  }

  componentWillMount () {
    profileController.actions.fetchPaymentInformation()
  }

  isStateChanged = () => {
    return !_.isEqual(this.state.paymentInfo, this.state.paymentInfoRev)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      paymentInfo: new (profileController.paymentInfoStructGenerator())(nextProps.paymentInfo),
      paymentInfoRev: new (profileController.paymentInfoStructGenerator())(nextProps.paymentInfo)
    })
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
      appController.confirmDiscardChanges(() => { this.setState({ isEdit: false, paymentInfo: { ...this.state.paymentInfoRev } }) })
    } else {
      this.setState({ isEdit: true })
    }
  }

  /**
   * Save button onClick
   * @return {Void}
   */
  updateClick = () => { profileController.actions.updatePaymentInformation(this.state.paymentInfo, () => { this.setState({ isEdit: false }) }) }

  /**
   * [description]
   * @param  {[type]} item [description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  handleInputChange = (item, type) => {
    const paymentInfo = { ...this.state.paymentInfo }
    paymentInfo[item.target.name] = item.target.value
    this.setState({ paymentInfo })
  }

  createHandleSelectChange = name => selected => {
    const paymentInfo = { ...this.state.paymentInfo }
    paymentInfo[name] = selected.value.toString()
    this.setState({ paymentInfo })
  }

  render () {
    const {
      profileIsLoading
    } = this.props

    const {
      paymentInfo
    } = this.state

    return <div id='PaymentInformation' className='profile-section'>
      <SectionHeader title='Payment Information' noPadding />
      <div className='section-content'>
        <DataDisplay edit={this.state.isEdit} items={[
          {
            label: 'First name',
            loading: profileIsLoading && !paymentInfo.first_name_billing,
            name: 'first_name_billing',
            onChange: this.handleInputChange,
            value: paymentInfo.first_name_billing,
            valueWidth: '30%'
          },
          {
            label: 'Last name',
            loading: profileIsLoading && !paymentInfo.last_name_billing,
            name: 'last_name_billing',
            onChange: this.handleInputChange,
            value: paymentInfo.last_name_billing,
            valueWidth: '30%'
          },
          {
            label: 'Card Number',
            loading: profileIsLoading && !paymentInfo.card_number,
            name: 'card_number',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'cc',
            value: paymentInfo.card_number,
            valueWidth: '30%'
          },
          {
            label: 'Expires',
            loading: profileIsLoading && !(paymentInfo.card_expiration_month && paymentInfo.card_expiration_year),
            monthName: 'card_expiration_month',
            monthOnChange: this.createHandleSelectChange('card_expiration_month'),
            monthsNumberValue: true,
            monthsNumberLabel: true,
            monthValue: parseInt(paymentInfo.card_expiration_month || 0),
            noDay: true,
            type: 'date',
            value: `${paymentInfo.card_expiration_month}/${paymentInfo.card_expiration_year}`,
            valueWidth: '15%',
            yearName: 'card_expiration_year',
            yearOnChange: this.handleInputChange,
            // 2017 => 2030
            yearValue: paymentInfo.card_expiration_year
          },
          {
            label: 'CVV',
            loading: profileIsLoading && !paymentInfo.cvv,
            name: 'cvv',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'ccv',
            value: paymentInfo.cvv,
            valueWidth: '6%'
          },
          {
            label: 'Billing Address',
            loading: profileIsLoading && !paymentInfo.address_billing,
            name: 'address_billing',
            onChange: this.handleInputChange,
            value: paymentInfo.address_billing,
            valueWidth: '30%'
          },
          {
            label: 'Billing Address 2',
            loading: profileIsLoading && !paymentInfo.address2_billing,
            name: 'address2_billing',
            onChange: this.handleInputChange,
            value: paymentInfo.address2_billing,
            valueWidth: '30%'
          },
          {
            label: 'City',
            loading: profileIsLoading && !paymentInfo.city_billing,
            name: 'city_billing',
            onChange: this.handleInputChange,
            value: paymentInfo.city_billing,
            valueWidth: '15%'
          },
          {
            label: 'State',
            loading: profileIsLoading && !paymentInfo.state_billing,
            name: 'state_billing',
            onChange: this.createHandleSelectChange('state_billing'),
            onValidate: this.handleInputValidate,
            type: 'state',
            value: paymentInfo.state_billing,
            valueWidth: '10%'
          },
          {
            label: 'Zip',
            loading: profileIsLoading && !paymentInfo.zip_billing,
            name: 'zip_billing',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'zip',
            value: paymentInfo.zip_billing,
            valueWidth: '10%'
          }
        ]} />
      </div>
      {this.state.isEdit ? <SaveCancel loading={this.props.profileIsLoading} disabled={this.state.errors.length} cancelOnClick={this.editClick} saveOnClick={this.updateClick} /> : <ButtonGroup buttons={[{ onClick: this.editClick, text: 'Edit' }]} />}
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    paymentInfo: state.profile.profile,
    profileIsLoading: state.profile.loading
  }
}

export default withRouter(connect(mapStateToProps)(PaymentInformation))
