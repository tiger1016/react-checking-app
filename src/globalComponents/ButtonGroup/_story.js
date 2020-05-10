// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ButtonGroup from './index'

storiesOf('ButtonGroup  - web', module)
  .add('default', () => (
    <ButtonGroup buttons={[{ text: 'click1' }, { text: 'click2' }, { text: 'click3' }]} />
  ))
