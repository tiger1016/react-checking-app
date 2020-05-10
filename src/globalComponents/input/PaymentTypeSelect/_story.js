// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import PaymentTypeSelect from './index'

storiesOf('PaymentTypeSelect  - web', module)
  .add('default', () => (
    <PaymentTypeSelect />
  ))
