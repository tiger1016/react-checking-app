// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import EINInput from './index'

storiesOf('EINInput  - web', module)
  .add('default', () => (
    <EINInput />
  ))
