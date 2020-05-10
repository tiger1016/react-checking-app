// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CustomersSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'

storiesOf('CustomersSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><CustomersSelect /></LoginDecorator>
  ))
