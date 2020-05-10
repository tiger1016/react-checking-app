// Libraries
import React from 'react'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default class CreditCardInput extends React.Component {
  constructor () {
    super()
    this.state = {
      card: null,
      error: false
    }
  }

  onChange = e => {
    e.target.value = e.target.value.replace(/\D+/g, '')

    const { onChange, onValidate } = this.props

    const error = 'Please enter a valid credit card.'

    if (!utility.isACreditCard(e.target.value)) {
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error })
      this.setState({ card: null, error: true })
    } else {
      const card = utility.isWhichCreditCard(e.target.value)
      card.number = e.target.value
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error: null })
      this.setState({ card, error: false })
    }

    if (utility.isAFunction(onChange)) onChange(e)
  }
  render () {
    const {
      error,
      name,
      reduxForm,
      required,
      type2,
      value
    } = this.props

    const card = this.state.card || {}
    const cardHasClassName = this.state.card ? ' validCard' : ''
    const mask = this.state.card && card.mask ? card.mask(card.number) : null

    return <div className={`CreditCardInput${cardHasClassName}`}>
      {card && card.name ? <div className='card-icon'>
        <img src={require(`Assets/cards/${card.name}.png`)} />
      </div> : null}
      <TextInput
        error={this.state.error || error}
        mask={mask}
        name={name}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        reduxForm={reduxForm}
        required={required}
        type2={type2}
        value={value}
      />
    </div>
  }
}
