// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import PetsSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'

storiesOf('PetsSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><PetsSelect /></LoginDecorator>
  ))
