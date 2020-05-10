// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ContentLoader from './index'

storiesOf('ContentLoader  - web', module)
  .add('default', () => (
    <div style={{ padding: '100px' }}>
      <ContentLoader />
    </div>
  ))
