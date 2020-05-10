// Libraries
import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { petsController } from 'Controllers/petsController'

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
  options={props.pets}
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
  options={props.pets}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  disabled={props.disabled}
/>

class PetsSelect extends React.Component {
  componentWillMount () {
    if (this.noPets()) {
      petsController.actions.fetchPets()
    }
  }
  noPets () {
    let {
      pets
    } = this.props

    return !pets || !utility.isAnArray(pets) || !pets.length
  }
  render () {
    if (this.props.petsLoading) return <div className='selectLoading'>Loading Pets...</div>

    return <div className='PetsSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  let pets = petsController.selectPetsForSelectInput(state)
  if (props.customer) {
    pets = petsController.selectCustomerPetsForSelectInput(state, props.customer)
  }
  if (props.uniqueName) {
    pets = petsController.selectUniquePetsByNameForSelectInput(state)
  }
  return {
    pets,
    petsLoading: state.pets.loading
  }
}

export default connect(mapStateToProps)(PetsSelect)
