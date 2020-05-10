// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { View } from 'react-native'
import Button from './index'

storiesOf('Button - shared', module)
  .add('default', () => <Button text='Button' />)
  .add('inside a fixed width container', () => <View style={{ width: 200 }}><Button text='Button' /></View>)
