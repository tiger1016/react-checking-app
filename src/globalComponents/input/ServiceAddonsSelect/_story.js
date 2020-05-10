// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ServiceAddonsSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'

storiesOf('ServiceAddonsSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><ServiceAddonsSelect /></LoginDecorator>
  ))
