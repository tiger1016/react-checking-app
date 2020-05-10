// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import Img from './index'

storiesOf('Img  - web', module)
  .add('without src or invalid src', () => (
    <Img />
  ))

  .add('with src', () => (
    <Img src='https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=250' />
  ))
