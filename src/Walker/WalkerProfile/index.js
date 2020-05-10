// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Styles
import './index.css'

// Controller
import { appController, walkersController } from 'Controllers'

// Components
import Button from 'GlobalComponents/Button'
import DataDisplay from 'GlobalComponents/DataDisplay'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionBody from 'GlobalComponents/SectionBody'
import SectionHeader from 'GlobalComponents/SectionHeader'

class WalkerProfile extends React.Component {
  constructor (props) {
    super(props)
    const { walker } = this.props
    this.state = {
      walker: new (walkersController.walkerStructGenerator())(walker),
      walkerRev: new (walkersController.walkerStructGenerator())(walker),
      errors: [],
      securityErrors: [],
      walkerSecurityInfo: new (walkersController.walkerSecurityStructGenerator())(walker),
      walkerSecurityInfoRev: new (walkersController.walkerSecurityStructGenerator())(walker)
    }
  }

  isStateChanged = (theWalker = true, walkerSecurity = true) => {
    const {
      walker,
      walkerRev,
      walkerSecurityInfo,
      walkerSecurityInfoRev
    } = this.state
    let { password2, ...info } = walkerSecurityInfo
    info = new (walkersController.walkerSecurityStructGenerator())(info)
    return (!_.isEqual(walker, walkerRev) && theWalker) ||
      (!_.isEqual(info, walkerSecurityInfoRev) && walkerSecurity)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      walker: new (walkersController.walkerStructGenerator())(nextProps.walker),
      walkerRev: new (walkersController.walkerStructGenerator())(nextProps.walker),
      walkerSecurityInfo: new (walkersController.walkerSecurityStructGenerator())(nextProps.walker),
      walkerSecurityInfoRev: new (walkersController.walkerSecurityStructGenerator())(nextProps.walker)
    })
  }

  handleInputValidate = ({ name, error }) => {
    const { errors } = this.state
    if (error && !errors.filter(e => e.name === name).length) {
      this.setState({ errors: [...errors, { name, error }] })
    } else if (!error) {
      this.setState({ errors: errors.filter(e => e.name !== name) })
    }
  }

  handleSecurityInputValidate = ({ name, error }) => {
    let { securityErrors, walkerSecurityInfo } = this.state
    this.forceUpdate(() => {
      if (name === 'password2') {
        if (walkerSecurityInfo.password !== walkerSecurityInfo.password2) {
          error = `password did't match`
        }
      }
      if (error && !securityErrors.filter(e => e.name === name).length) {
        securityErrors = [...securityErrors, { name, error }]
        this.forceUpdate()
      } else if (!error) {
        this.setState({ securityErrors: securityErrors.filter(e => e.name !== name) })
      }
    })
  }

  toggleWalkerProfile = (event) => {
    const { isProfileEditing } = this.props
    const { walkerRev } = this.state
    if (isProfileEditing) {
      const cancelEdit = () => {
        walkersController.actions.updateWalkerProfileEditState()
        this.setState({
          walker: new (walkersController.walkerStructGenerator())(walkerRev)
        })
      }
      if (this.isStateChanged(true, false)) {
        appController.confirmDiscardChanges(cancelEdit)
      } else {
        walkersController.actions.updateWalkerProfileEditState()
      }
    } else {
      walkersController.actions.updateWalkerProfileEditState(true)
    }
  }

  toggleWalkerSecurity = (event) => {
    const { isSecurityEditing } = this.props
    const { walkerSecurityInfoRev } = this.state
    if (isSecurityEditing) {
      const cancelEdit = () => this.setState({
        walkerSecurityInfo: new (walkersController.walkerSecurityStructGenerator())(walkerSecurityInfoRev)
      }, () => {
        walkersController.actions.updateWalkerSecurityEditState()
      })
      if (this.isStateChanged(false, true)) {
        appController.confirmDiscardChanges(cancelEdit)
      } else {
        walkersController.actions.updateWalkerSecurityEditState()
      }
    } else {
      walkersController.actions.updateWalkerSecurityEditState(true)
    }
  }

  handleInputChange = (item, type, name) => {
    if (item) {
      const walker = { ...this.state.walker }
      switch (type) {
        case 'select':
          walker[name] = item.value
          this.setState({ walker })
          break
        case 'date':
          walker[name] = item
          this.setState({ walker })
          break
        default:
          walker[item.target.name] = item.target.value
          this.setState({ walker })
      }
    }
  }

  handleSecurityInputChange = (item) => {
    const walkerSecurityInfo = { ...this.state.walkerSecurityInfo }
    walkerSecurityInfo[item.target.name] = item.target.value
    this.setState({ walkerSecurityInfo })
  }

  handleHireDateChange = date => {
    const walker = { ...this.state.walker }
    walker.hire_date = date
    this.setState({ walker })
  }

  UpdateSecurityInformation = () => {
    const { walkerId } = this.props
    const { walkerSecurityInfo } = this.state
    walkersController.actions.updateWalker(walkerId, walkerSecurityInfo, this.SaveProfileCallback)
  }

  SaveProfile = (event) => {
    const { walkerId } = this.props
    const { walker } = this.state
    walkersController.actions.updateWalker(walkerId, walker, this.SaveProfileCallback)
  }

  SaveProfileCallback = () => {
    walkersController.actions.updateWalkerProfileEditState()
    walkersController.actions.updateWalkerSecurityEditState()
  }

  render () {
    const { isProfileEditing, isSecurityEditing, isWalker, walkersLoading } = this.props
    const {
      errors,
      securityErrors,
      walker,
      walkerSecurityInfo
    } = this.state

    return (
      <div className='staff-profile-container'>
        <SectionBody>
          <SectionHeader title='Staff Information' noPadding
            rightComponent={<Button onClick={this.toggleWalkerProfile}
              textOnly
              iconOnly='ion-edit'
            />}
          />
          <div className='content'>
            <div>
              <h6>Contact Information</h6>
              <DataDisplay edit={isProfileEditing} items={[
                {
                  label: 'First Name',
                  name: 'first_name',
                  onChange: this.handleInputChange,
                  required: true,
                  value: walker.first_name,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Last Name',
                  name: 'last_name',
                  onChange: this.handleInputChange,
                  required: true,
                  value: walker.last_name,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Email',
                  name: 'email',
                  onChange: this.handleInputChange,
                  onValidate: this.handleInputValidate,
                  required: true,
                  type: 'email',
                  value: walker.email,
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
                  value: walker.phone_mobile,
                  valueMinWidth: '180px'
                },
                {
                  error: errors.filter(e => e.name === 'phone_work').length,
                  label: 'Work Phone',
                  name: 'phone_work',
                  onChange: this.handleInputChange,
                  onValidate: this.handleInputValidate,
                  type: 'phone',
                  value: walker.phone_work,
                  valueMinWidth: '180px'
                },
                {
                  error: errors.filter(e => e.name === 'phone_home').length,
                  label: 'Home Phone',
                  name: 'phone_home',
                  onChange: this.handleInputChange,
                  onValidate: this.handleInputValidate,
                  type: 'phone',
                  value: walker.phone_home,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Address',
                  name: 'address',
                  onChange: this.handleInputChange,
                  required: true,
                  value: walker.address,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Address 2',
                  name: 'address2',
                  onChange: this.handleInputChange,
                  value: walker.address2,
                  valueMinWidth: '180px'
                },
                {
                  label: 'City',
                  name: 'city',
                  onChange: this.handleInputChange,
                  required: true,
                  value: walker.city,
                  valueMinWidth: '180px'
                },
                {
                  label: 'State',
                  name: 'state',
                  onChange: (e) => this.handleInputChange(e, 'select', 'state'),
                  onValidate: this.handleInputValidate,
                  required: true,
                  type: 'state',
                  value: walker.state,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Zip',
                  name: 'zip',
                  onChange: this.handleInputChange,
                  onValidate: this.handleInputValidate,
                  required: true,
                  type: 'zip',
                  value: walker.zip,
                  valueMinWidth: '180px'
                }
              ]} />
            </div>
            <div>
              <h6>Work Information</h6>
              <DataDisplay edit={isProfileEditing} items={[
                {
                  label: 'Hire Date',
                  name: 'hire_date',
                  onChange: this.handleHireDateChange,
                  value: walker.hire_date,
                  type: 'date-picker',
                  valueMinWidth: '180px'
                },
                {
                  label: 'Transportation Type',
                  name: 'transportation_type',
                  onChange: this.handleInputChange,
                  value: walker.transportation_type,
                  valueMinWidth: '180px'
                },
                {
                  label: 'License Plate',
                  name: 'license_plate',
                  onChange: this.handleInputChange,
                  value: walker.license_plate,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Payroll Frequency',
                  name: 'payroll_frequency',
                  onChange: (e) => this.handleInputChange(e, 'select', 'payroll_frequency'),
                  type: 'billing-frequency',
                  value: walker.payroll_frequency,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Payroll Date',
                  name: 'payroll_date',
                  onChange: (e) => this.handleInputChange(e, 'select', 'payroll_date'),
                  type: 'day-of-month',
                  value: walker.payroll_date,
                  valueMinWidth: '180px',
                  hide: walker.payroll_frequency !== 'monthly'
                },
                {
                  label: 'Email Payroll Reports',
                  name: 'payroll_email',
                  onChange: (e) => this.handleInputChange(e, 'select', 'payroll_email'),
                  type: 'toggle-select',
                  value: walker.payroll_email,
                  valueMinWidth: '180px'
                },
                {
                  label: 'Email Alerts',
                  name: 'alerts_email',
                  onChange: (e) => this.handleInputChange(e, 'select', 'alerts_email'),
                  type: 'toggle-select',
                  value: walker.alerts_email,
                  hide: true
                },
                {
                  label: 'Walker Access Level',
                  name: 'walker_admin',
                  onChange: (e) => this.handleInputChange(e, 'select', 'walker_admin'),
                  type: 'walker-access-level-select',
                  value: walker.walker_admin
                },
                {
                  label: 'Notes',
                  name: 'notes',
                  onChange: this.handleInputChange,
                  type: 'textarea',
                  value: walker.notes
                },
                {
                  label: 'Bio',
                  name: 'bio',
                  onChange: this.handleInputChange,
                  type: 'textarea',
                  value: walker.bio
                }
              ]} />
            </div>
            <div>
              <h6>Emergency Contact Information</h6>
              <DataDisplay edit={isProfileEditing} items={[
                {
                  label: 'Name',
                  name: 'name_emergency',
                  onChange: this.handleInputChange,
                  value: walker.name_emergency
                },
                {
                  error: errors.filter(e => e.name === 'phone_emergency').length,
                  label: 'Phone',
                  name: 'phone_emergency',
                  type: 'phone',
                  onChange: this.handleInputChange,
                  onValidate: this.handleInputValidate,
                  value: walker.phone_emergency
                }
              ]} />
            </div>
          </div>
          {isProfileEditing
            ? <SaveCancel
              loading={walkersLoading}
              disabled={errors.length}
              cancelOnClick={this.toggleWalkerProfile}
              saveOnClick={this.SaveProfile}
            /> : null}

          <div className='division' />
          <SectionHeader title='Security' noPadding rightComponent={<Button onClick={this.toggleWalkerSecurity} textOnly iconOnly='ion-edit' />} />
          <div className='content'>
            <DataDisplay edit={isSecurityEditing} items={[
              {
                label: 'Password',
                name: 'password',
                onChange: this.handleSecurityInputChange,
                onValidate: this.handleSecurityInputValidate,
                value: walkerSecurityInfo.password,
                required: true,
                type: 'password',
                hide: isWalker
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
                hide: isWalker || !isSecurityEditing
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
            ]}
            />
          </div>
          {!isWalker && isSecurityEditing
            ? <SaveCancel
              loading={walkersLoading}
              disabled={securityErrors.length}
              cancelOnClick={this.toggleWalkerSecurity}
              saveOnClick={this.UpdateSecurityInformation}
            /> : null}
        </SectionBody>
        <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
      </div>
    )
  }
}

WalkerProfile.propTypes = {
  isProfileEditing: PropTypes.bool,
  isSecurityEditing: PropTypes.bool,
  walker: PropTypes.object,
  walkerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  walkersLoading: PropTypes.bool
}

const mapStateToProps = (state, props) => {
  const { walkerId } = props
  const walkersExists = !!state.walkers.walkers.length
  const walker = walkersExists ? state.walkers.walkers.find(c => Number(c.user_id) === Number(walkerId)) : null
  const { isProfileEditing, isSecurityEditing } = state.walkers

  return {
    isProfileEditing,
    isSecurityEditing,
    walker,
    walkersLoading: state.walkers.loading
  }
}

export default withRouter(connect(mapStateToProps)(WalkerProfile))
