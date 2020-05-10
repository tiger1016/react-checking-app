// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import AllCapsText from './index'

storiesOf('AllCapsText  - web', module)
  .add('default', () => (
    <AllCapsText text='Test' />
  ))
