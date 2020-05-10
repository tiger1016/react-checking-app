// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableHighlight } from 'react-native'

// Utils
import { utility } from '../../../utils'

// Style
// import Styles from './styles'

class NavTab extends React.Component {
  changeRoute = (route) => {
    this.props.history.push(route)
  }

  resolveActive = route => {
    let {
      pathname
    } = this.props
    pathname = pathname.split('#')[0]
    if (route.keepActiveOnSubNav) {
      const regex = new RegExp('^' + route.path + '.*')
      return pathname.match(regex)
    } else {
      return pathname === route.path
    }
  }

  render () {
    const {
      doNotOverflowUnderlines,
      paddingBottom
    } = this.props

    let routes = this.props.routes.map(route => ({
      ...route,
      active: this.resolveActive(route)
    }))

    if (!routes.filter(r => r.active).length) {
      routes = routes.map(route => ({
        ...route,
        active: route.index
      }))
    }

    return <View className={`NavTab${paddingBottom ? ' padding-bottom' : ''}`}>
      {routes.map((route, i) => <TouchableHighlight
        className={`nav-tab-link${route.active ? ' selected' : ''}${i === 0 ? ' first' : ''}${doNotOverflowUnderlines ? ' doNotOverflowLinkUnderline' : ''}`}
        key={i}
        onPress={() => {
          if (utility.isAFunction(route.onClick)) {
            route.onClick()
          }
          this.changeRoute(route.path)
        }}
      >
        <Text>{route.title}</Text>
      </TouchableHighlight>)}
      <View className='bottom-line' />
    </View>
  }
}

NavTab.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
}

export default NavTab
