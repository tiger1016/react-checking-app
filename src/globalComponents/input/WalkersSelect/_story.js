// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import WalkersSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'

storiesOf('WalkersSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><WalkersSelect /></LoginDecorator>
  ))
