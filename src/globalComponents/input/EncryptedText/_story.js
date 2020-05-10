// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import EncryptedText from './index'

storiesOf('EncryptedText  - web', module)
  .add('default', () => (
    <EncryptedText count={10} />
  ))
