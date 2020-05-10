// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import Button from './index'

storiesOf('Button - web', module)
  .add('default', () => <Button />)
  .add('inside a fixed width container', () => <div style={{ width: '200px' }}><Button /></div>)
