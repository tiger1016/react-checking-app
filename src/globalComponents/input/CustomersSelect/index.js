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
  onValidate={props.onValidate}
  options={props.customers}
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
  onValidate={props.onValidate}
  options={props.customers}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  disabled={props.disabled}
/>

class CustomersSelect extends React.Component {
  componentWillMount () {
    if (this.noCustomers()) {
      customersController.actions.fetchCustomers()
    }
  }
  noCustomers () {
    const {
      customers
    } = this.props

    return !customers || !utility.isAnArray(customers) || !customers.length
  }
  render () {
    if (this.noCustomers()) return <div className='selectLoading'>Loading Customers...</div>

    return <div className='CustomersSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = state => {
  const customers = customersController.selectCustomersForSelectInput(state)

  return {
    customers: customers.sort((a, b) => {
      if (!a.lastName || !b.lastName) return 0
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1
      return 0
    })
  }
}

export default connect(mapStateToProps)(CustomersSelect)
