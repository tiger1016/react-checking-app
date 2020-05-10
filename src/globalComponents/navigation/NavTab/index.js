// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

// Utils
import { utility } from 'Utils/utility'

// Style
import './index.css'

class NavTab extends React.Component {
  resolveActive = route => {
    let {
      location
    } = this.props

    let { pathname } = location
    pathname = pathname.split('#')[0]
    if (route.keepActiveOnSubNav) {
      let regex = new RegExp('^' + route.path + '.*')
      return pathname.match(regex)
    } else {
      return pathname === route.path
    }
  }
  render () {
    let {
      doNotOverflowUnderlines,
      id,
      routes,
      paddingBottom
    } = this.props

    routes = routes.map(route => ({
      ...route,
      active: this.resolveActive(route)
    }))

    if (!routes.filter(r => r.active).length) {
      routes = routes.map(route => ({
        ...route,
        active: route.index
      }))
    }

    return <div id={id} className={`NavTab${paddingBottom ? ' padding-bottom' : ''}`}>
      {routes.map((route, i) => <Link
        className={`nav-tab-link${route.active ? ' selected' : ''}${i === 0 ? ' first' : ''}${doNotOverflowUnderlines ? ' doNotOverflowLinkUnderline' : ''}`}
        id={`${id}-link-to-${route.path}`}
        key={i}
        name={`${id}-link-to-${route.path}`}
        title={route.title}
        to={route.path}
        onClick={() => {
          if (utility.isAFunction(route.onClick)) {
            route.onClick()
          }
        }}
      >
        <span>{route.title}</span>
      </Link>)}
      <div className='bottom-line' />
    </div>
  }
}

NavTab.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
}

export default withRouter(NavTab)
