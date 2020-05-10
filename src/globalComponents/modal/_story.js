// Libraries
import React from 'react'
import { storiesOf } from '@storybook/react'
import ModalFoter from './modalFoter'
import ModalBtnLight from './modalBtnLight'
import ModalBtnPrimary from './modalBtnPrimary'

storiesOf('Modal - web', module)
  .add('default', () => (
    <ModalFoter >
      <ModalBtnPrimary text='Save' />
      <ModalBtnLight text='Cancel' />
    </ModalFoter >
  ))
