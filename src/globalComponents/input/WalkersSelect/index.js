// Libraries
import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { walkersController } from 'Controllers/walkersController'

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
  options={props.walkers}
  placeholder={props.placeholder || '--'}
  required={props.required}
  multi={props.multi}
  iconClassname={props.iconClassname}
/>

const defaultSelect = props => <CustomSelect
  error={props.error}
  clearable={props.clearable}
  name={props.name}
  onChange={props.onChange}
  onValidate={props.onValidate}
  options={props.walkers}
  placeholder={props.placeholder || '--'}
  required={props.required}
  value={props.value}
  multi={props.multi}
  iconClassname={props.iconClassname}
  sorted={props.sorted}
  disabled={props.disabled}
/>

class WalkersSelect extends React.Component {
  componentWillMount () {
    if (this.noWalkers()) {
      walkersController.actions.fetchWalkers()
    }
  }
  noWalkers () {
    let {
      walkers
    } = this.props

    return !walkers || !utility.isAnArray(walkers) || !walkers.length
  }
  render () {
    if (this.noWalkers()) return <div className='selectLoading'>Loading Walkers...</div>

    return <div className='WalkersSelect'>{
      this.props.reduxForm ? reduxFormSelect(this.props) : defaultSelect(this.props)}
    </div>
  }
}

const mapStateToProps = (state, props) => {
  let walkers = []
  if (props.onlyActive) {
    walkers = walkersController.selectActiveWalkersForSelectInput(state)
  } else {
    walkers = walkersController.selectWalkersForSelectInput(state)
  }
  return {
    walkers
  }
}

export default connect(mapStateToProps)(WalkersSelect)
