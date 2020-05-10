// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CurrencyInput from './index'

storiesOf('CurrencyInput  - web', module)
  .add('default', () => (
    <CurrencyInput />
  ))
