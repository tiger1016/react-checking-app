// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import Image from './index'

storiesOf('Image  - web', module)
  .add('default', () => (
    <Image src='https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=250' />
  ))
