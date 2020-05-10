// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CustomInputWithIcon from './index'
import TextInput from '../input/TextInput'

storiesOf('CustomInputWithIcon  - web', module)
  .add('default', () => (
    <div style={{ padding: '100px' }}>
      <CustomInputWithIcon calendar='calendar'>
        <TextInput />
      </CustomInputWithIcon>
    </div>
  ))
