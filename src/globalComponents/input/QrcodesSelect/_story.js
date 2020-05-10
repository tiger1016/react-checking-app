// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import QrcodesSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'

storiesOf('QrcodesSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><QrcodesSelect /></LoginDecorator>
  ))
