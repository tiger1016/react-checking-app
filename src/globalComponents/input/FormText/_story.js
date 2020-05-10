// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import FormText from './index'

storiesOf('FormText  - web', module)
  .add('without help', () => (
    <FormText text='hello' />
  ))
  .add('with help', () => (
    <FormText text='hello' help='help' />
  ))
