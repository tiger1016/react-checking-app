// Libraries
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field } from 'redux-form'

// Utils
import { utility } from 'Utils/utility'

// Controllers
// import { servicesController } from '../../../../controllers'

// Actions
import fetchUnbilledServices from 'Actions/customers/fetchUnbilledServices'

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
  options={props.unbilledServices}
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
  options={props.unbilledServices}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  disabled={props.disabled}
/>

class UnbilledServicesSelect extends React.Component {
  componentWillMount () {
    const { unbilledServicesLoading } = this.props
    if (!unbilledServicesLoading && this.noUnbilledServices()) {
      const { customerId, fetchUnbilledServices } = this.props
      fetchUnbilledServices(customerId)
    }
  }
  noUnbilledServices () {
    let { unbilledServices } = this.props
    return !unbilledServices || !utility.isAnArray(unbilledServices) || !unbilledServices.length
  }
  render () {
    const { reduxForm, unbilledServicesLoading } = this.props
    if (unbilledServicesLoading && this.noUnbilledServices()) return <div className='UnbilledServicesSelect selectLoading'>Loading Services...</div>
    return <div className='UnbilledServicesSelect'>{
      reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = (state, { customerId }) => {
  let customer = state.customers.customers.find(c => `${c.user_id}` === `${customerId}`)
  let services = customer.unbilledServices || []
  let unbilledServices = services.map(s => ({ value: s.walk_id, label: s.dropdown_description }))
  return {
    unbilledServices,
    unbilledServicesLoading: state.customers.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUnbilledServices: bindActionCreators(fetchUnbilledServices, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UnbilledServicesSelect)
