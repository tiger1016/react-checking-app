// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import Tab from './Tab'

storiesOf('Tab  - web', module)
  .add('default', () => (
    <Tab tabs={[{ title: 'Tab1', content: <span>hello!</span> }, { title: 'Tab2', content: <span>foo!</span> }]} />
  ))
