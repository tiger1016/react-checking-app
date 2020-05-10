// Libraries
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

// Styles
import './index.css'

export default class NavButton extends React.Component {
  render () {
    const {
      active,
      icon,
      id,
      navButton,
      unreadAlerts
    } = this.props

    return <div className='NavButton' id={id} name={navButton} title={navButton}>
      <button type='button' className={classNames(['nav-item', active && 'highlight'])}>
        {navButton === 'Alerts'
          ? <div>
            <div className='notifications'>
              <div className={icon} />
              {!!unreadAlerts && <span className='badge'>{unreadAlerts}</span>}
            </div>
          </div>
          : <div className={icon} />
        }
        <span>{navButton}</span>
      </button>
    </div>
  }
}

NavButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.string.isRequired,
  navButton: PropTypes.string.isRequired
}
