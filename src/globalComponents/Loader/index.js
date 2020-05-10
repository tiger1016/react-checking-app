// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'

// Styles
import './index.css'

/**
 * Uses React Spinkit https://github.com/KyleAMathews/react-spinkit
 */
export default class Loader extends React.Component {
  render () {
    let {
      color,
      fadeIn,
      spinnerStyle
    } = this.props
    return <div className='LoaderContainer'>
      <Spinner fadeIn={fadeIn || 'half'} name={spinnerStyle || 'line-scale'} color={color || 'rgb(2,86,138)'} />
    </div>
  }
}

Loader.propTypes = {
  color: PropTypes.string,
  fadeIn: PropTypes.oneOf([
    'full',
    'half',
    'quarter',
    'none'
  ]),
  spinnerStyle: PropTypes.oneOf([
    'chasing-dots',
    'circle',
    'cube-grid',
    'double-bounce',
    'folding-cube',
    'pulse',
    'rotating-plane',
    'three-bounce',
    'wandering-cubes',
    'wave',
    'wordpress'
    // Others at https://kyleamathews.github.io/react-spinkit/
  ])
}
