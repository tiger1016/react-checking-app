// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import FormLink from './index'

storiesOf('FormLink  - web', module)
  .add('default', () => (
    <FormLink text='clickMe' />
  ))
