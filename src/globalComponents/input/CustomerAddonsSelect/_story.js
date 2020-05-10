// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import CustomerAddonsSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'
// // // Controllers
// import { sessionController } from '../../../../controllers'
// const email = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_USERNAME : ''
// const password = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_PASSWORD : ''

// sessionController.actions.requestLogin(email, password)

storiesOf('CustomerAddonsSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><CustomerAddonsSelect /></LoginDecorator>
  ))
