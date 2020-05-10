// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import DoubleInputAndAction from './index'

storiesOf('DoubleInputAndAction  - web', module)
  .add('default', () => (
    <DoubleInputAndAction buttonText='Save' />
  ))
