// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import PetBreedSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'

storiesOf('PetBreedSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><PetBreedSelect /></LoginDecorator>
  ))
