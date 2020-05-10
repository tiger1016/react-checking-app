// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import CustomSelect from '../../globalComponents/input/CustomSelect'

// Styles
import styles from './styles'
class NavSelect extends React.Component {
  changeRoute = (route = {}) => {
    this.props.history.push(route.value)
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
    let {
      routes
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
    let routesOptions = []
    if (routes && routes.length > 0) {
      routesOptions = routes.map(item => { return { value: item.path, label: item.title, active: item.active } })
    }
    return <View style={styles.NavSelect}><CustomSelect value={routesOptions.find(item => item.active)} options={routesOptions} onChange={this.changeRoute} /></View>
  }
}

NavSelect.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
}

export default NavSelect
