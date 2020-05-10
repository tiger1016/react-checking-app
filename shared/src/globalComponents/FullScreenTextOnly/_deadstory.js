// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import FullScreenTextOnly from './index'

storiesOf('FullScreenTextOnly (Shared)', module)
  .add('no text', () => (
    <FullScreenTextOnly />
  ))
