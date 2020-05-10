// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import Switch from './index'

storiesOf('Switch  - web', module)
  .add('default', () => (
    <Switch />
  ))
  .add('no Text', () => (
    <Switch noText />
  ))
