// Libraries
import React from 'react'

// Components
import RadioInput from '../RadioInput'

// Styles
import './index.css'

export default class RadioInputGroup extends React.Component {
  render () {
    let {
      radios,
      vertical
    } = this.props
    return <div className={`RadioInputGroup${vertical ? ' vertical' : ''}`}>
      {radios.map((r, i) => <RadioInput
        checked={r.checked}
        child={r.child}
        help={r.help}
        key={i}
        label={r.label}
        name={r.name}
        onChange={r.onChange}
        parentOf={r.parentOf}
        reduxForm={r.reduxForm}
        value={r.value}
      />)}
    </div>
  }
}
