// Libraries
import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { servicesController } from 'Controllers/servicesController'

// Actions
import fetchAddons from 'Actions/addons/fetchAddons'

// Components
import CustomSelect from '../CustomSelect'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormSelect = props => <Field
  component={Select}
  help={props.help}
  name={props.name}
  onClose={props.onClose}
  onOpen={props.onOpen}
  onValidate={props.onValidate}
  options={props.servicesAndAddons}
  placeholder={props.placeholder || '--'}
  required={props.required}
/>

const defaultSelect = (props, newServices, onCreateOption) => <CustomSelect
  Creatable
  clearable={props.clearable}
  name={props.name}
  onChange={onCreateOption}
  onCreateOption={onCreateOption}
  onClose={props.onClose}
  onOpen={props.onOpen}
  onValidate={props.onValidate}
  options={[...props.servicesAndAddons, ...newServices]}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  disabled={props.disabled}
/>

class ServiceAddonsSelect extends React.Component {
  constructor () {
    super()
    this.state = { newServices: [] }
  }
  componentWillMount () {
    if (this.noServices()) servicesController.fetchServices()
    if (this.noAddons()) this.props.fetchAddons()

    if (this.props.servicesAndAddons.length > 0) {
      if (typeof this.props.value === 'string' && this.props.value !== '') {
        if (!this.props.servicesAndAddons.find(value => value === this.props.value)) {
          let _newServices = [...this.state.newServices]
          _newServices.push({ label: this.props.value, value: this.props.value, cost: 0 })
          this.setState({ newServices: _newServices })
        }
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.servicesAndAddons.length !== nextProps.servicesAndAddons.length) {
      if (typeof this.props.value === 'string' && this.props.value !== '') {
        if (!this.props.servicesAndAddons.find(value => value === this.props.value)) {
          let _newServices = [...this.state.newServices]
          _newServices.push({ label: this.props.value, value: this.props.value, cost: 0 })
          this.setState({ newServices: _newServices })
        }
      }
    }
  }
  onCreateOption = e => {
    if (!this.props.servicesAndAddons.find(value => value === e)) {
      let _newServices = [...this.state.newServices]
      _newServices.push({ label: e.label, value: e.value, cost: 0 })
      this.setState({ newServices: _newServices })
      e.cost = 0
    }
    this.props.onChange(e)
  }
  noServices = () => {
    let { services } = this.props
    return !services || !utility.isAnArray(services) || !services.length
  }
  noAddons = () => {
    let { addons } = this.props
    return !addons || !utility.isAnArray(addons) || !addons.length
  }
  render () {
    if (this.noServices() || this.noAddons()) return <div className='selectLoading'>Loading Services & Addons...</div>

    return <div className='ServiceAddonsSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props, this.state.newServices, this.onCreateOption)}
    </div>
  }
}

const mapStateToProps = state => {
  let servicesAndAddons = []
  servicesController.selectActiveServices(state).forEach(s => {
    servicesAndAddons.push({ label: s.dropdown_description, value: s.dropdown_description, cost: s.cost })
  })
  state.addons.addons.forEach(a => {
    servicesAndAddons.push({ label: a.addon_name, value: a.addon_name, cost: a.addon_price })
  })
  return {
    services: servicesController.selectActiveServices(state),
    addons: state.addons.addons,
    servicesAndAddons: servicesAndAddons
  }
}

const mapDispatchToProps = {
  fetchAddons
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAddonsSelect)
