// Libraries
import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

// Controllers
import { profileController } from 'Controllers/profileController'

// Components
import CustomSelect from '../CustomSelect'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  onValidate={props.onValidate}
  options={props.qrcodes}
  placeholder={props.placeholder || '--'}
  required={props.required}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  onValidate={props.onValidate}
  options={props.qrcodes}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
/>

class QrcodesSelect extends React.Component {
  componentWillMount () {
    profileController.actions.fetchCustomersQrcodes()
  }
  render () {
    if (this.props.profileIsLoading) return <div className='selectLoading'>Loading Qrcodes...</div>

    return <div className='QrcodesSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  let qrcodes = []
  if (state.profile.profile && state.profile.profile.availableQrcodes) {
    qrcodes = state.profile.profile.availableQrcodes.map(item => { return { label: item.toString().padStart(5, '0'), value: item } })
  }
  if (props.originalValue && qrcodes.findIndex(qr => Number(qr.value) === Number(props.originalValue)) === -1) {
    qrcodes.unshift({ label: props.originalValue.toString().padStart(5, '0'), value: props.originalValue })
  }
  return {
    qrcodes: qrcodes,
    profileIsLoading: state.profile.loading
  }
}

export default connect(mapStateToProps)(QrcodesSelect)
