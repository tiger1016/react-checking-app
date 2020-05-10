// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CustomSelect from './index'

storiesOf('CustomSelect  - web', module)
  .add('with options ', () => (
    <CustomSelect options={[{ label: 'option1', value: 1 }, { label: 'option2', value: 2 }, { label: 'option2', value: 2 }]} />
  ))
  .add('without options ', () => (
    <CustomSelect />
  ))
