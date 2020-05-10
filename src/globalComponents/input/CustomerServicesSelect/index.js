// Libraries
import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { customersController } from 'Controllers/customersController'

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
  options={props.services}
  placeholder={props.placeholder || '--'}
  required={props.required}
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
  options={props.services}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  disabled={props.disabled}
/>

class ServicesSelect extends React.Component {
  componentWillMount () {
    if (this.noServices() && this.props.customer) {
      customersController.actions.fetchServiceRates(this.props.customer)
    }
  }
  noServices () {
    let {
      services
    } = this.props

    return !services || !utility.isAnArray(services) || !services.length
  }
  render () {
    if (this.noServices() && this.props.customerLoading) return <div className='selectLoading'>Loading Services...</div>

    return <div className='ServicesSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  let services = customersController.selectCustomerServicesForSelectInput(props.customer, null, state)

  return {
    services,
    customerLoading: state.customers.loading
  }
}

export default connect(mapStateToProps)(ServicesSelect)
