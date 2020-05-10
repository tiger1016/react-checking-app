// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CustomIcon from './index'

storiesOf('CustomIcon  - web', module)
  .add('default', () => (
    <CustomIcon name='ion-plus' />
  ))
