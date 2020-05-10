// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'
import moment from 'moment'
// Controllers
import { appController, profileController } from 'Controllers'

// Components
import ButtonGroup from 'GlobalComponents/ButtonGroup'
import DataDisplay from 'GlobalComponents/DataDisplay'
import SectionHeader from 'GlobalComponents/SectionHeader'
import SaveCancel from 'GlobalComponents/SaveCancel'

// Styles
import './index.css'

class BankInformation extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      bankInfo: new (profileController.bankInfoStructGenerator())(this.props.bankInfo),
      bankInfoRev: new (profileController.bankInfoStructGenerator())(this.props.bankInfo),
      errors: [],
      isValidBirthDate: this.isValidBirthDate(this.props.bankInfo.birth_month, this.props.bankInfo.birth_day, this.props.bankInfo.birth_year),
      isEdit: false
    }
  }

  componentWillMount () {
    profileController.actions.fetchBankInformation()
  }

  isStateChanged = () => {
    return !_.isEqual({ ...this.state.bankInfo }, { ...this.state.bankInfoRev })
  }
  isValidBirthDate = (month, day, year) => {
    let isValid = false
    if (month && day && year) {
      if (moment(month + '-' + day + '-' + year, 'MM-DD-YYYY').isValid()) {
        let birthDate = moment(month + '-' + day + '-' + year, 'MM-DD-YYYY')
        let maxDate = moment().add('years', -18)
        let minDate = moment().add('years', -100)
        if (birthDate > minDate && birthDate < maxDate) {
          return true
        }
      }
    }
    return isValid
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      bankInfo: new (profileController.bankInfoStructGenerator())(nextProps.bankInfo),
      bankInfoRev: new (profileController.bankInfoStructGenerator())(nextProps.bankInfo)
    })
  }

  /**
   * Toggles on editing
   * @return {Void}
   */
  editClick = () => {
    if (this.state.isEdit) {
      if (this.isStateChanged()) {
        appController.confirmDiscardChanges(() => { this.setState({ isEdit: false, bankInfo: { ...this.state.bankInfoRev } }) })
      } else {
        this.setState({ isEdit: false })
      }
    } else {
      let bankInfo = { ...this.state.bankInfo }
      this.setState({ isEdit: true, bankInfo })
    }
  }

  /**
   * Save button onClick. TODO: Same as billing functionality
   * @return {Void}
   */
  updateClick = () => profileController.actions.updateBankInformation(this.state.bankInfo, () => { this.setState({ isEdit: false }) })

  /**
   * [handleInputChange description]
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  handleInputChange = item => {
    let bankInfo = { ...this.state.bankInfo }
    let bankInfoKey = item.target.name
    bankInfo[bankInfoKey] = item.target.value
    this.setState({ bankInfo }, () => {
      if (bankInfoKey === 'birth_year') {
        this.setState({ isValidBirthDate: this.isValidBirthDate(this.state.bankInfo.birth_month, this.state.bankInfo.birth_day, this.state.bankInfo.birth_year) })
      }
    })
  }

  handleInputValidate = ({ name, error }) => {
    if (error && !this.state.errors.filter(e => e.name === name).length) {
      this.setState({ errors: [ ...this.state.errors, { name, error } ] })
    } else if (!error) {
      if (this.state.errors.find(e => e.name === name)) {
        this.setState({ errors: this.state.errors.filter(e => e.name !== name) })
      }
    }
  }

  /**
   * [description]
   * @param  {[type]} selected [description]
   * @return {[type]}          [description]
   */
  handleMonthChange = selected => {
    let bankInfo = { ...this.state.bankInfo }
    // 1 - 12
    bankInfo.birth_month = selected.value
    this.setState({ bankInfo }, () => {
      this.setState({ isValidBirthDate: this.isValidBirthDate(this.state.bankInfo.birth_month, this.state.bankInfo.birth_day, this.state.bankInfo.birth_year) })
    })
  }

  /**
   * [description]
   * @param  {[type]} selected [description]
   * @return {[type]}          [description]
   */
  handleDayChange = selected => {
    var bankInfo = { ...this.state.bankInfo }
    // 1 - 31
    bankInfo.birth_day = selected.value

    this.setState({ bankInfo }, () => {
      this.setState({ isValidBirthDate: this.isValidBirthDate(this.state.bankInfo.birth_month, this.state.bankInfo.birth_day, this.state.bankInfo.birth_year) })
    })
  }

  render () {
    let {
      profileIsLoading
    } = this.props

    let {
      bankInfo
    } = this.state

    return <div id='BankInformation' className='profile-section'>
      <SectionHeader title='Bank Information' noPadding />
      <div className='section-content'>
        <DataDisplay edit={this.state.isEdit} items={[
          {
            label: 'Bank Account Number',
            loading: profileIsLoading && !bankInfo.bank_account_number,
            name: 'bank_account_number',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'account',
            value: bankInfo.bank_account_number,
            valueWidth: '30%'
          },
          {
            label: 'Bank Routing Number',
            loading: profileIsLoading && !bankInfo.bank_routing_number,
            name: 'bank_routing_number',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'routing',
            value: bankInfo.bank_routing_number,
            valueWidth: '30%'
          },
          {
            dayName: 'birth_day',
            error: !this.state.isValidBirthDate,
            dayOnChange: this.handleDayChange,
            onValidate: this.handleInputValidate,
            dayValue: bankInfo.birth_day,
            label: 'Birth Date',
            loading: profileIsLoading && !(bankInfo.birth_day && bankInfo.birth_month && bankInfo.birth_year),
            monthName: 'birth_month',
            monthOnChange: this.handleMonthChange,
            monthsNumberValue: true,
            monthValue: bankInfo.birth_month,
            type: 'date',
            value: `${bankInfo.birth_month || 0}/${bankInfo.birth_day || 0}/${bankInfo.birth_year || '0000'}`,
            valueWidth: '30%',
            yearName: 'birth_year',
            yearOnChange: this.handleInputChange,
            yearValue: bankInfo.birth_year
          },
          {
            label: 'Federal Identification Number (FEIN)',
            loading: profileIsLoading && !bankInfo.fein_number,
            name: 'fein_number',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            error: !bankInfo.fein_number && !bankInfo.social_number,
            type: 'ein',
            value: bankInfo.fein_number,
            valueWidth: '10%'
          },
          {
            label: 'Social Security Number (SSN)',
            loading: profileIsLoading && !bankInfo.social_number,
            name: 'social_number',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            error: !bankInfo.social_number && !bankInfo.fein_number,
            type: 'ssn',
            value: bankInfo.social_number,
            valueWidth: '10%'
          },
          {
            type: 'message',
            value: 'This information above is required by the credit card processor for sign up approval and to guarantee deposit of your customer credit card transactions. Transactions are deposited 48 business hours after processing. May take 1-2 days before credit card processing is activated.',
            valueWidth: '45%'
          }
        ]} />
      </div>
      {this.state.isEdit ? <SaveCancel loading={this.props.profileIsLoading} disabled={this.state.errors.length || !this.state.isValidBirthDate} cancelOnClick={this.editClick} saveOnClick={this.updateClick} />
        : <ButtonGroup buttons={[{ onClick: this.editClick, text: 'Edit' }]} />}
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    bankInfo: state.profile.profile,
    profileIsLoading: state.profile.loading
  }
}

export default withRouter(connect(mapStateToProps)(BankInformation))
