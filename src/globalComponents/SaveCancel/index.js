// Libraries
import React from 'react'

// Components
import ButtonGroup from '../ButtonGroup'

// Styles
import './index.css'

export default props => <ButtonGroup className='SaveCancel' buttons={[
  {
    disabled: props.disabled,
    loading: props.loading,
    onClick: props.saveOnClick,
    text: props.saveText || 'Save'
  },
  {
    hide: props.loading || props.noCancel,
    disabled: props.cancelDisabled,
    onClick: props.cancelOnClick,
    text: props.cancelText || 'Cancel',
    textOnly: true
  }
]} />
