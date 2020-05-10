// Libraries
import React from 'react'
import { ListView, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Moment from 'moment'
import Icon from '../../globalComponents/CustomIcon'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase
import { logger } from '../../../utils'

export default class MobileHorizontalScrollMenu extends React.Component {
  constructor () {
    super()
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  _renderDay = (hour, sectionId, rowId) => <View style={styles.textContainer}>
    <TouchableHighlight onPress={event => this.props.scrollTo(event, rowId)}>
      <Text style={styles.item}>{hour.hour}</Text>
    </TouchableHighlight>
  </View>

  _renderWeek = (day, sectionId, rowId) => <View style={styles.textContainer}>
    <TouchableHighlight onPress={event => this.props.scrollTo(event, rowId)}>
      <Text style={styles.item}>{Moment(day.date).format('dddd')}</Text>
    </TouchableHighlight>
  </View>

  render () {
    logger.rlog('<MobileHorizontalScrollMenu />', this)
    return <View className='MobileHorizontalScrollMenu' style={styles.container}>
      <View style={[styles.arrowContainer, styles.arrowLeftContainer]}><Icon name='ios-arrow-back' size={14} color='#999' /></View>
      <ListView
        horizontal
        dataSource={this.ds.cloneWithRows(this.props.items)}
        renderRow={this.props.mode === 'week' ? this._renderWeek : this._renderDay}
      />
      <View style={[styles.arrowContainer, styles.arrowRightContainer]}><Icon name='ios-arrow-forward' size={14} color='#999' /></View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: format_number(12, 'px')
  },
  arrowContainer: {
    paddingTop: format_number(24, 'px'),
    paddingBottom: format_number(24, 'px')
  },
  arrowLeftContainer: {
    paddingLeft: format_number(10, 'px'),
    paddingRight: format_number(10, 'px')
  },
  arrowRightContainer: {
    paddingLeft: format_number(10, 'px'),
    paddingRight: format_number(10, 'px')
  },
  item: {
    color: '#999999',
    fontFamily: 'Roboto',
    fontSize: format_number(12, 'px')
  },
  textContainer: {
    paddingTop: format_number(24, 'px'),
    paddingBottom: format_number(24, 'px'),
    paddingLeft: format_number(24, 'px'),
    paddingRight: format_number(24, 'px')
  }
})
