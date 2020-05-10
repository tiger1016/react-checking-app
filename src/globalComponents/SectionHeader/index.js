// Libraries
import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './index.css'
import Help from '../Help'

export default class SectionHeader extends React.Component {
  resolveAlign = align => {
    if (align === 'left') {
      return ' align-left'
    } else if (align === 'right') {
      return ' align-right'
    } else if (align === 'center') {
      return ' align-center'
    } else if (align === 'space-around') {
      return ' align-space-around'
    }
    return ''
  }
  render () {
    let {
      help,
      align,
      bigBottomPadding,
      bigLeftPadding,
      emptyTitle,
      leftAction,
      noPadding,
      rightComponent,
      leftComponent,
      skinny,
      title
    } = this.props
    return <div className={`SectionHeader${noPadding ? ' noPadding' : ''}${skinny ? ' skinny' : ''}${bigLeftPadding ? ' bigLeftPadding' : ''}${bigBottomPadding ? ' bigBottomPadding' : ''}${leftAction ? ' leftAction' : ''}`}>
      <div className={`inner-container${this.resolveAlign(align)}`}>
        {leftAction ? <div className='left-actions'>{leftAction()}</div> : null}
        <div className='left'>
          <span>{emptyTitle ? '' : (title || 'Missing this.props.title')}</span>{help && <Help text={help} place={'right'} />}{leftComponent || ''}

        </div>
        <div className='right'>{rightComponent || ''}</div>
      </div>
    </div>
  }
}

SectionHeader.propTypes = {
  rightComponent: PropTypes.element,
  noPadding: PropTypes.bool,
  text: PropTypes.string
}
