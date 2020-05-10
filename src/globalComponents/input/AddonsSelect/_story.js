// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import AddonsSelect from './index'
import LoginDecorator from 'Utils/components/LogInDecorator'
// // // Controllers
// import { sessionController } from '../../../../controllers'
// const email = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_USERNAME : ''
// const password = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_PASSWORD : ''

// sessionController.actions.requestLogin(email, password)

storiesOf('AddonsSelect  - web', module)
  .add('default', () => (
    <LoginDecorator><AddonsSelect /></LoginDecorator>
  ))
