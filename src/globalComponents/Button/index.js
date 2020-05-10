// Libraries
import React from 'react'
import classNames from 'classnames'

// Components
import CustomIcon from '../CustomIcon'
import Loader from '../Loader'

// Styles
import './index.css'

const containerClassResolver = (props = {}, square = false) => {
  let {
    disabled,
    gray,
    iconOnly,
    round,
    textOnly,
    loading,
    green
  } = props
  return classNames({
    'base': !textOnly,
    'button-container': !square,
    'button-square-container': square,
    'disabled': (disabled || loading),
    'icon-only': iconOnly,
    'gray': gray,
    'green': green,
    'round': round,
    'text-only': textOnly,
    'spinner': loading
  })
}

export default props => <div className={containerClassResolver(props)}>
  {props.iconOnly ? <button type={props.type || 'button'} className='icon-only-button' onClick={props.onClick} disabled={props.disabled}>
    <CustomIcon name={props.iconOnly} size={props.size} />
  </button> : <button type={props.type || 'button'} id={props.id} className='button' onClick={props.onClick} disabled={props.disabled || props.loading}>
    {!props.loading && <span>{props.text || 'button'}</span>}
    {props.loading && <Loader spinnerStyle='circle' color='#FFF' />}
  </button>}
</div>

export const ButtonSquare = props => <div
  className={containerClassResolver(props)}
  style={{ height: props.height || null, width: props.width || null }}
>
  {props.iconOnly ? <button type={props.type || 'button'} className='icon-only-button' onClick={props.onClick} disabled={props.disabled}>
    <CustomIcon name={props.iconOnly} size={props.size} />
  </button> : <button type={props.type || 'button'} id={props.id} className='button' onClick={props.onClick} disabled={props.disabled}>
    <span>{props.text}</span>
  </button>}
</div>
