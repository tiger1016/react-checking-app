// Libraries
import React from 'react'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

const numberMask = createNumberMask({
  allowDecimal: true,
  decimalLimit: 3,
  integerLimit: 3,
  prefix: '',
  suffix: ' lb'
})

export default class WeightInput extends React.Component {
  constructor () {
    super()
    this.state = {
      error: false
    }
  }
  onChange = e => {
    let {
      onChange,
      onValidate
    } = this.props

    let error = 'Please enter a valid weight.'

    let val = e.target.value.replace(/lb/g, '').trim()

    if (!utility.isWeight(val)) {
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error })
      this.setState({ error: true })
    } else {
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error: null })
      this.setState({ error: false })
    }

    if (utility.isAFunction(onChange)) onChange(e)
  }
  render () {
    let {
      error,
      name,
      reduxForm,
      required,
      type2,
      value
    } = this.props

    return <div className='WeightInput'>
      <TextInput
        error={error || this.state.error}
        // iconLeft='ion-social-usd'
        mask={numberMask}
        name={name}
        onChange={this.onChange}
        reduxForm={reduxForm}
        required={required}
        type2={type2}
        value={value}
      />
    </div>
  }
}
