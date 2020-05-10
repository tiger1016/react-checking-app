// Libraries
import React from 'react'

// Styles
import './index.css'

// Componentes
import TextInput from '../TextInput'
import Button from '../../Button'

export default props => <div className='DoubleInputAndAction'>
  <div className='input-container'>
    <div className='label'>{props.input1label}</div>
    <TextInput
      error={props.error}
      name={props.input1Name}
      onChange={props.input1OnChange}
      password={props.type === 'password'}
      type2={props.textInputYype2}
      value={props.input1Value}
    />
  </div>
  <div className='input-container'>
    <div className='label'>{props.input2label}</div>
    <TextInput
      error={props.error}
      name={props.input2Name}
      onChange={props.input2OnChange}
      password={props.type === 'password'}
      type2={props.textInputYype2}
      value={props.input2Value}
    />
  </div>
  <Button loading={props.loading} onClick={props.buttonOnClick} text={props.buttonText} />
</div>
