// Libraries
import React from 'react'

// Styles
import './index.css'

export default props => <div className={`chart-backdrop${props.right ? ' right' : ''}`}>
  <div className='backdrop-container'>
    <div />
    <div className='backdrop-horizontal' />
    <div className='backdrop-horizontal' />
    <div className='backdrop-horizontal' />
    <div className='backdrop-horizontal' />
    <div className='backdrop-vertical' />
  </div>
</div>
