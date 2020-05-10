// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import LabelText from './index'

storiesOf('LabelText  - web', module)
  .add('default', () => (
    <LabelText text='Label' />
  ))
