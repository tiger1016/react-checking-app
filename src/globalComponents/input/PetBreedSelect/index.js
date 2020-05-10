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
  name={props.name}
  onValidate={props.onValidate}
  options={props.petBreeds}
  placeholder={props.placeholder || '--'}
  required={props.required}
/>

const defaultSelect = props => <CustomSelect
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  onValidate={props.onValidate}
  options={props.petBreeds}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
/>

class PetBreedSelect extends React.Component {
  componentWillMount () {
    if (this.noPetBreeds()) {
      petsController.actions.fetchPetBreeds()
    }
  }
  noPetBreeds () {
    let {
      petBreeds
    } = this.props

    return !petBreeds || !utility.isAnArray(petBreeds) || petBreeds.length <= 1
  }
  render () {
    if (this.noPetBreeds()) return <div className='selectLoading'>Loading PetBreads...</div>

    return <div className='PetBreedSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = state => {
  let petBreeds = petsController.selectPetBreedForSelectInput(state)
  petBreeds.push({ label: 'Unknown', value: -1 })
  return {
    petBreeds
  }
}

export default connect(mapStateToProps)(PetBreedSelect)
