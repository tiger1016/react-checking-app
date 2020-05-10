// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ModalTemplate from './index'

storiesOf('ModalTemplate  - web', module)
  .add('default', () => (
    <ModalTemplate title='foo' />
  ))
