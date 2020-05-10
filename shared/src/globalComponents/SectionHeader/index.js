// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from 'react-native'
// Styles
import styles from './styles'

export default class SectionHeader extends React.Component {
  resolveInnerContainer = props => {
    const _style = {}
    if (props.align === 'left') {
      _style.justifyContent = 'flex-start'
    } else if (props.align === 'right') {
      _style.justifyContent = 'flex-end'
    } else if (props.align === 'center') {
      _style.justifyContent = 'center'
    } else if (props.align === 'space-around') {
      _style.justifyContent = 'space-around'
    }
    if (props.noPadding) {
      _style.paddingVertical = 0
    }
    if (props.skinny) {
      _style.padding = 0
    }
    if (props.bigLeftPadding) {
      _style.paddingLeft = 28
    }
    if (props.bigBottomPadding) {
      _style.paddingBottom = 30
    }
    return StyleSheet.flatten(styles.SectionHeader__inner_container, _style)
  }

  render () {
    const {
      emptyTitle,
      leftAction,
      rightComponent,
      leftComponent,
      title
    } = this.props
    return <View style={styles.SectionHeader}>
      <View style={this.resolveInnerContainer(this.props)}>

        <View style={styles.SectionHeader__inner_container__left}>
          {leftAction && <View style={styles.leftActions}>{leftAction()}</View>}
          <Text style={styles.SectionHeader__inner_container__left_text}>{emptyTitle ? '' : (title || 'Missing this.props.title')}</Text>{leftComponent || null}
        </View>
        <View style={styles.SectionHeader__inner_container__right}>{rightComponent || null}</View>
      </View>
    </View>
  }
}

SectionHeader.propTypes = {
  rightComponent: PropTypes.element,
  noPadding: PropTypes.bool,
  text: PropTypes.string
}
