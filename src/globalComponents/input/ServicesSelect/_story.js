// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ServicesSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'

storiesOf('ServicesSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><ServicesSelect /></LoginDecorator>
  ))
