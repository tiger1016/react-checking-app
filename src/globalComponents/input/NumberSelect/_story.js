// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import NumberSelect from './index'

storiesOf('NumberSelect  - web', module)
  .add('default', () => (
    <NumberSelect />
  ))
  .add('with Range', () => (
    <NumberSelect min={10} max={50} />
  ))
