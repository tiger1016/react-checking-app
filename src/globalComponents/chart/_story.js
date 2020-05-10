// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import SimplePieChart from './SimplePieChart'
const _data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }]

storiesOf('chart  - web', module)
  .add('SimplePieChart', () => (
    <SimplePieChart data={_data} color='red' innerLabel='innerFoo' outerLabel='outerFoo' />
  ))
