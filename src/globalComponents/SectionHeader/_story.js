// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import SectionHeader from './index'

storiesOf('SectionHeader  - web', module)
  .add('default', () => (
    <SectionHeader title='foo' />
  ))
