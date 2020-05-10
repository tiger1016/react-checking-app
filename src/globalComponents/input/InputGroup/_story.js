// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import InputGroup from './index'

storiesOf('InputGroup  - web', module)
  .add('default', () => (
    <InputGroup fields={[{ type: 'radio' }]} />
  ))
