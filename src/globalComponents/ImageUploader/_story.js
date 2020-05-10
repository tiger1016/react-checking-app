// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ImageUploader from './index'

storiesOf('ImageUploader  - web', module)
  .add('default', () => (
    <div style={{ width: '100px' }}>
      <ImageUploader />
    </div>
  ))
  .add('with upload Button and size Info', () => (
    <div style={{ width: '100px' }}>
      <ImageUploader uploadBtn sizeInfo='max 2mb' />
    </div>
  ))
