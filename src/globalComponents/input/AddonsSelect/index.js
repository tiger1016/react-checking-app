// Libraries
import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { addonsController } from 'Controllers/addonsController'

// Components
import CustomSelect from '../CustomSelect'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  iconClassname={props.iconClassname}
  multi={props.multi}
  name={props.name}
  onClose={props.onClose}
  onOpen={props.onOpen}
  onValidate={props.onValidate}
  options={props.addons}
  placeholder={props.placeholder || '--'}
  required={props.required}
  disabled={props.disabled}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  error={props.error}
  iconClassname={props.iconClassname}
  multi={props.multi}
  name={props.name}
  onChange={props.onChange}
  onClose={props.onClose}
  onOpen={props.onOpen}
  onValidate={props.onValidate}
  options={props.addons}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  disabled={props.disabled}
/>

class AddonsSelect extends React.Component {
  componentWillMount () {
    if (this.noAddons()) {
      addonsController.fetchAddons()
    }
  }
  noAddons () {
    let {
      addons
    } = this.props

    return !addons || !utility.isAnArray(addons) || !addons.length
  }
  render () {
    if (this.noAddons()) return <div className='selectLoading'>Loading Addons...</div>

    return <div className='AddonsSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = state => {
  let addons = addonsController.selectAddonsForSelectInput(state)

  return {
    addons
  }
}

export default connect(mapStateToProps)(AddonsSelect)
