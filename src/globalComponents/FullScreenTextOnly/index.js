// Libraries
import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '../Button'
import ErrorDisplay from '../ErrorDisplay'
import Loader from '../Loader'

// Styles
import './index.css'

const FullScreenTextOnly = props => <div className={`FullScreenTextOnly${props.error ? ' error' : ''}`}>
  {props.spinner ? <div className='loader-container'>
    <Loader fadeIn='quarter' />
  </div> : null}
  {props.error ? <div className='loader-container'>
    <ErrorDisplay />
  </div> : null}
  <div className='text-container'>
    <span className='text'>{props.text}</span>
  </div>
  {props.action ? <div className='action-container'>
    <Button textOnly text='retry' onClick={props.action} />
  </div> : null}
</div>

FullScreenTextOnly.propTypes = {
  action: PropTypes.func,
  error: PropTypes.bool,
  spinner: PropTypes.bool,
  text: PropTypes.string
}

export default FullScreenTextOnly
